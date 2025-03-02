'use client'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
import { Search, Plus, PencilSquare, Trash, BookHalf, Globe  , Person} from 'react-bootstrap-icons';
import Link from 'next/link';
// import Image from 'next/image';
import { VocabularyList } from '@/types/vocabulary';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import { vocabularyService } from '../../lib/api_vocab';
import { resizeAndConvertToBase64 } from '@/utils/upload';

const CATEGORIES = [
  { value: '', label: 'Select a category' },
  { value: 'Business', label: 'Business' },
  { value: 'Academic', label: 'Academic' },
  { value: 'General', label: 'General' },
  { value: 'IELTS', label: 'IELTS' },
  { value: 'TOEIC', label: 'TOEIC' },
  { value: 'Other', label: 'Other' }
];

export default function VocabularyLists() {
  // const [lists, setLists] = useState<VocabularyList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedList, setSelectedList] = useState<VocabularyList | null>(null);
  const [isListLoading, setIsLoading] = useState(false);

  const [lists, setLists] = useState<VocabularyList[]>([]); // Dữ liệu danh sách từ vựng
  const [dataUser, setDataUser] = useState<VocabularyList[]>([]); // Lưu data_user gốc
  const [dataPublic, setDataPublic] = useState<VocabularyList[]>([]);// Lưu data_public gốc
  const [isDiscovering, setIsDiscovering] = useState(false); // Trạng thái nút Discover

  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

    // Xử lý khi người dùng chọn file

  // console.log(localStorage.getItem('refresh_token'))
  // Load initial data
  useEffect(() => {
    loadVocabularyLists();
  }, []);

  const loadVocabularyLists = async () => {
    try {
      const data = await vocabularyService.getVocabList();
      console.log(data);
      setDataUser(data.vocab_list_user); // Lưu danh sách user
      setDataPublic(data.vocab_list_public); // Lưu danh sách public
      setLists(data.vocab_list_user); // Mặc định hiển thị danh sách user
    } catch (error) {
      console.error("Error loading vocabulary lists:", error);
    }
  };

  const toggleList = () => {
    if (isDiscovering) {
      setLists(dataUser); // Chuyển về danh sách của user
    } else {
      setLists(dataPublic); // Chuyển sang danh sách public
    }
    setIsDiscovering(!isDiscovering); // Đảo trạng thái
  };
  interface VocabListFormData {
    title: string;
    description: string;
    category: string;
    image_base64?: string;

  }
  const initialFormData: VocabListFormData = {
    title: '',
    description: '',
    category: '',
    image_base64: '',
  };
  // Modal form state
  const [formData, setFormData] = useState<VocabListFormData>(initialFormData);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await resizeAndConvertToBase64(file);
        setFormData({ ...formData, image_base64: base64String });
      } catch (error) {
        console.error("Lỗi khi xử lý ảnh:", error);
      }
    }
  };

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleAddNew = () => {
    setSelectedList(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleEdit = (list: VocabularyList) => {
    setSelectedList(list);
    setFormData({
      title: list.title,
      description: list.description,
      category: list.category,
      // image: list.image ?? '',
    });
    setShowModal(true);
  };

  const handleDelete = async(id: number) => {
    if (confirm('Are you sure you want to delete this list?')) {
      // Handle delete logic here
      await vocabularyService.deleteVocabList(id);
      await loadVocabularyLists();
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedList) {
        // Handle update logic here
        const updatedList ={
          list_id: selectedList.list_id,
          ...formData
        }
        console.log('data update:', updatedList);
        await vocabularyService.editVocabList(updatedList);

      } else {
        console.log('data new:', formData);
        await vocabularyService.createVocabList(formData);
        console.log('createdList:', lists);
      }

      setShowModal(false);
      // Refresh the list after adding
      await loadVocabularyLists();
    } catch (error) {
      console.error('Error saving vocabulary list:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };
    // Render loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // Render null khi chưa login
    if (!isLoggedIn) {
      return null;
    }

  // Rest of the component remains the same...
  return (
    <Container className="py-4">
      {/* Header section remains the same */}
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Vocabulary Lists</h1>
          <Row className="align-items-center">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search lists"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={8} className="text-end">
              <Button variant="primary" className="me-2" onClick={toggleList}>
                
                {isDiscovering ? <Person className="me-2" /> : <Globe className="me-2" />}
                {isDiscovering ? "My Lists" : "Public Lists"}
              </Button>
              <Button variant="primary" onClick={handleAddNew}>
                <Plus className="me-2" />
                Create New List
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Lists Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {lists.map((list) => (
          <Col key={`list-${list.list_id}`}>
            <Card className="h-100 shadow-sm border-0">
              {(
                <div className="card-img-container" style={{ height: '180px', overflow: 'hidden'}}>
                  <Card.Img
                  variant="top"
                  src={list.image || '/english.jpg'}
                  alt={list.title}
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/english.jpg';
                  }}
                />
                  
                </div>
              )}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="primary">{list.category}</Badge>
                  <small className="text-muted">
                    {list.total_words} words
                  </small>
                </div>
                <Card.Title className="text-truncate">{list.title}</Card.Title>
                <Card.Text 
                className="text-muted small mb-3"
                style={{
                  minHeight: '60px', 
                  maxHeight: '60px', 
                  overflow: 'hidden', 
                  display: '-webkit-box',
                  WebkitLineClamp: 3  ,  // Giới hạn 2 dòng
                  WebkitBoxOrient: 'vertical'
                }}>
                {list.description}
              </Card.Text>
                {list.progress !== undefined && (
                  <div className="mb-3">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${list.progress}%` }}
                        aria-valuenow={list.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {list.progress}%
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between">
                  <Link href={`/vocabulary/${list.list_id}`} passHref>
                    <Button variant="outline-primary">
                      <BookHalf className="me-2" />
                      View Words
                    </Button>
                  </Link>
                  <div>
                    <Button
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(list)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(list.list_id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <small>Updated: {new Date(list.updated_at ?? "").toLocaleDateString()}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedList ? 'Edit Vocabulary List' : 'Create New Vocabulary List'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter list title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter list description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                {CATEGORIES.map(category => (
                  <option key={`category-${category.value}`} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isListLoading}>
              {isListLoading ? 'Saving...' : (selectedList ? 'Save Changes' : 'Create List')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
