// app/vocabulary-lists/page.tsx
'use client'
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Modal } from 'react-bootstrap';
import { Search, Plus, PencilSquare, Trash, BookHalf } from 'react-bootstrap-icons';
import Link from 'next/link';
import Image from 'next/image';
import { VocabularyList } from '@/types/vocabulary';

// Dữ liệu mẫu


const sampleVocabularyLists: VocabularyList[] = [
  {
    id: 1,
    title: "Business English Essential Words",
    description: "Common vocabulary used in business meetings and correspondence",
    createdAt: "2024-02-08",
    updatedAt: "2024-02-08",
    totalWords: 50,
    category: "Business",
    progress: 75,
    image: "/english.jpg"
  },
  {
    id: 2,
    title: "IELTS Academic Writing",
    description: "Key vocabulary for IELTS academic writing tasks Phần 1",
    createdAt: "2024-02-07",
    updatedAt: "2024-02-07",
    totalWords: 100,
    category: "Academic",
    progress: 30,
    image: "/ielts.jpg"
  },
  {
    id: 3,
    title: "IELTS Academicdfdf Writing",
    description: "Key vocabulary for IELTS academic writing tasks. Phần 2",
    createdAt: "2024-02-07",
    updatedAt: "2024-02-07",
    totalWords: 100,
    category: "Acadvvemic",
    progress: 30,
    image: "/ielts.jpg"

  },
  // Thêm các list khác...
];

export default function VocabularyLists() {
  const [lists, setLists] = useState<VocabularyList[]>(sampleVocabularyLists);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedList, setSelectedList] = useState<VocabularyList | null>(null);

  // Modal form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handleAddNew = () => {
    setSelectedList(null);
    setFormData({ title: '', description: '', category: '' });
    setShowModal(true);
  };

  const handleEdit = (list: VocabularyList) => {
    setSelectedList(list);
    setFormData({
      title: list.title,
      description: list.description,
      category: list.category
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this list?')) {
      setLists(lists.filter(list => list.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedList) {
      // Update existing list
      setLists(lists.map(list =>
        list.id === selectedList.id
          ? { ...list, ...formData }
          : list
      ));
    } else {
      // Add new list
      const newList: VocabularyList = {
        id: lists.length + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        totalWords: 0,
        progress: 0
      };
      setLists([...lists, newList]);
    }
    setShowModal(false);
  };

  return (
    <Container className="py-4">
      {/* Header */}
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
          <Col key={list.id}>
            <Card className="h-100">
              {list.image && (
                <div style={{ position: 'relative', height: '160px' }}>
                  <Image
                    src={list.image}
                    alt={list.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="primary">{list.category}</Badge>
                  <small className="text-muted">
                    {list.totalWords} words
                  </small>
                </div>
                <Card.Title>{list.title}</Card.Title>
                <Card.Text>{list.description}</Card.Text>
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
                  <Link href={`/vocabulary/${list.id}`} passHref>
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
                      onClick={() => handleDelete(list.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <small>Updated: {list.updatedAt}</small>
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
                <option value="">Select a category</option>
                <option value="Business">Business</option>
                <option value="Academic">Academic</option>
                <option value="General">General</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEIC">TOEIC</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Handle image upload logic here
                  //console.log('Image upload:', e.target.files?.[0]);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedList ? 'Save Changes' : 'Create List'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}