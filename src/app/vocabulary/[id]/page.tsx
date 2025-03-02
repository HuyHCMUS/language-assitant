'use client'
import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
import { Container, Row, Col, Form, Button, Card, InputGroup, Modal, Alert, Table, Pagination } from "react-bootstrap";
import { Search, Plus, PencilSquare, Trash, VolumeUp, Upload, Save } from "react-bootstrap-icons";
import { VocabularyItem } from "@/types/vocabulary";
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { vocabularyService } from '../../../lib/api_vocab';
import { toast } from 'react-hot-toast';
import { resizeAndConvertToBase64 } from "@/utils/upload";
import { VocabularyFormData } from "@/types/vocabulary";
import { getdictapi } from "../../../lib/api_vocab";

export default function VocabularyListDetail() {
  const params = useParams();
  const list_id = Number(params.id);
  const containerRef = useRef<HTMLDivElement>(null);

  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([]);
  const [isVocabLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [image, setImage] = useState<string | null>(null);
  // const [isAutoFilling, setIsAutoFilling] = useState(false);
  //====================
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchData, setBatchData] = useState([
    { word: '', ipa: '', definition: '', example: '' }
  ]);
  const [pasteArea, setPasteArea] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleBatchModalClose = () => setShowBatchModal(false);
  const handleBatchModalShow = () => setShowBatchModal(true);

  const handleShowPasteArea = () => setShowPasteArea(true);
  const handleHidePasteArea = () => setShowPasteArea(false);

  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth(); // const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  const initialFormData: VocabularyFormData = {
    word: "",
    ipa: "",
    definition: "",
    example: "",
    image_base64: "",
  };

  const fetchVocabularyItems = async () => {
    try {
      setIsLoading(true);
      const items = await vocabularyService.getVocabularyItems(list_id);
      setVocabularyItems(items);
    } catch (error) {
      toast.error('Failed to fetch vocabulary items');
      console.error('Error fetching vocabulary items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState<VocabularyFormData>(initialFormData);

  // Fetch vocabulary items
  useEffect(() => {
    if (isLoggedIn && list_id) {
      fetchVocabularyItems();
    }
  }, [isLoggedIn, list_id]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Scroll to top when page changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleAutoFill = async () => {
    if (!formData.word.trim()) {
      // Không làm gì nếu từ vựng chưa được nhập
      return
    }
    try {
      //setIsAutoFilling(true);
      const data = await getdictapi(formData.word);
      setFormData({
        ...formData,
        ipa: data.ipa,
        definition: data.definition,
        example: data.example,
        // Có thể thêm các trường khác nếu API trả về
      });
    }
    catch (error) {
      console.error('Error auto-filling vocabulary:', error);
      // Có thể hiển thị thông báo lỗi cho người dùng
      alert('Could not auto-fill vocabulary information. Please try again or fill manually.');
    } finally {
      //setIsAutoFilling(false);
    }
  }

  // Xử lý khi người dùng chọn file
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

  const handleEdit = (item: VocabularyItem) => {
    setSelectedItem(item);
    setFormData({
      word: item.word,
      ipa: item.ipa,
      definition: item.definition,
      example: item.example,
      // image_base64: item.image_base64
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this vocabulary item?")) {
      try {
        await vocabularyService.deleteVocabularyItem(id);
        setVocabularyItems(vocabularyItems.filter((item) => item.item_id !== id));
        toast.success('Vocabulary item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete vocabulary item');
        console.error('Error deleting vocabulary item:', error);
      }
    }
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        // Update existing item
        // const updatedItem = await vocabularyService.updateVocabularyItem({
        //   ...selectedItem,
        //   ...formData,
        // });
        toast.success('Vocabulary item updated successfully');
      } else {
        // Add new item
        const send_data = {
          ...formData,
          list_id,
        } as VocabularyItem;
        console.log('send_data:', send_data);
        const newItem = await vocabularyService.createVocabularyItem(send_data);
        setVocabularyItems([...vocabularyItems, newItem]);
        toast.success('New vocabulary item added successfully');
      }
      await fetchVocabularyItems();
      setShowModal(false);
    } catch (error) {
      toast.error(selectedItem ? 'Failed to update vocabulary item' : 'Failed to add vocabulary item');
      console.error('Error saving vocabulary item:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = vocabularyItems.filter((item) =>
    (item.word ?? "").toLowerCase().includes((searchTerm ?? "").toLowerCase()) ||
    (item.definition ?? "").toLowerCase().includes((searchTerm ?? "").toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <Pagination.Item 
        key={1} 
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );
    
    // If many pages, add ellipsis after page 1
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis1" />);
    }
    
    // Pages around current page
    for (let number = Math.max(2, currentPage - 1); number <= Math.min(totalPages - 1, currentPage + 1); number++) {
      if (number !== 1 && number !== totalPages) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    }
    
    // If many pages, add ellipsis before last page
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis2" />);
    }
    
    // Always show last page (if there is more than one page)
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    
    return items;
  };

  //===============
  const handlePasteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasteArea(e.target.value);
  };

  const handleProcessPaste = () => {
    try {
      // Process pasted data from Excel/spreadsheet
      const rows = pasteArea.trim().split('\n');
      const newBatchData = rows.map(row => {
        const cells = row.split('\t');
        if (cells.length < 4) throw new Error('Not enough columns');

        return {
          word: cells[0] || '',
          ipa: cells[1] || '',
          definition: cells[2] || '',
          example: cells[3] || ''
        };
      });

      setBatchData(newBatchData);
      setShowPasteArea(false);
      setErrorMessage('');
    } catch  {
      setErrorMessage('Invalid data format. Please ensure your data has the columns: word, ipa, definition, example.');
    }
  };

  const handleAddRow = () => {
    setBatchData([...batchData, { word: '', ipa: '', definition: '', example: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const newData = [...batchData];
    newData.splice(index, 1);
    setBatchData(newData);
  };
  type VocabularyField = 'word' | 'ipa' | 'definition' | 'example';
  const handleBatchInputChange = (
    index: number,
    field: VocabularyField,
    value: string
  ) => {
    const newData = [...batchData] as VocabularyItem[];
    newData[index][field] = value;
    setBatchData(newData);
  };

  const handleSaveBatch = async () => {
    // Filter out empty rows
    const validData = batchData.filter(item => item.word.trim() !== '');

    // Here you would save the data to your database
    console.log('Saving batch data:', validData);
    for (let i = 0; i < validData.length; i++) {
      const send_data = {
        ...validData[i],
        list_id,
      } as VocabularyItem;
      console.log('send_data:', send_data);
      //const newItem = await vocabularyService.createVocabularyItem(send_data);
    }
    await fetchVocabularyItems();
    // Close modal after saving
    handleBatchModalClose();

    // Reset batch data
    setBatchData([{ word: '', ipa: '', definition: '', example: '' }]);
  };


  if (isVocabLoading) {
    return <div>Loading...</div>;
  }
  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render null khi chưa login
  if (!isLoggedIn) {
    return null;
  }
  // Rest of the JSX remains the same, just update the event handlers in the JSX to match the new implementations
  return (
    <Container className="py-4" ref={containerRef}>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Business English Vocabulary</h1>
          <Row className="align-items-center">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search vocabulary"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={8} className="text-end">
              <Button variant="outline-primary" onClick={handleBatchModalShow} className="me-2">
                <Upload className="me-2" />
                Batch Import
              </Button>
              <Button variant="primary" onClick={handleAddNew}>
                <Plus className="me-2" />
                Add New Vocabulary
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Pagination Info */}
      <Row className="mb-3">
        <Col>
          <p>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items</p>
        </Col>
      </Row>

      {/* Vocabulary Cards */}
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <Card key={item.item_id} className="mb-4">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <div className="mb-3">
                    <h2>{item.word}</h2>
                    <p className="text-muted font-italic">{item.ipa}</p>
                  </div>
                  <ul>
                    {item.definition.split("\n").map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                  <p className="text-muted font-italic" style={{ fontStyle: "italic", whiteSpace: "pre-line" }}>{item.example}</p>
                  <Row className="align-items-center">
                    <Col>
                      {(
                        <Button
                          variant="light"
                          className="me-2"
                          onClick={() => new Audio('https://dict.youdao.com/dictvoice?audio=' + item.word + '&type=2').play()}
                        >
                          <VolumeUp /> US
                        </Button>
                      )}
                      {(
                        <Button
                          variant="light"
                          onClick={() => new Audio('https://dict.youdao.com/dictvoice?audio=' + item.word + '&type=1').play()}
                        >
                          <VolumeUp /> UK
                        </Button>
                      )}
                    </Col>
                    <Col className="text-end">
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(item)}
                      >
                        <PencilSquare />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.item_id)}
                      >
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <img
                    src={item.image_url || '/english.jpg'}
                    alt="Preview"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Ngăn loop lỗi nếu ảnh mặc định cũng không tải được
                      target.src = '/english.jpg'; // Đường dẫn ảnh mặc định trong thư mục public
                    }}
                    height={200}
                    className="mt-2"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="info">No vocabulary items found matching your search criteria.</Alert>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Row className="mt-4 mb-5">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
              />
              
              {renderPaginationItems()}
              
              <Pagination.Next 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages}
              />
              <Pagination.Last 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem ? "Edit Vocabulary Item" : "Add New Vocabulary Item"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Word</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={formData.word}
                      onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleAutoFill}
                      disabled={!formData.word}
                    >
                      Auto Fill
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>IPA</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ipa}
                    onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Definition</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.definition}
                onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Example</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.example}
                onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                required
              />
            </Form.Group>


            {/* File Upload Section */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedItem ? 'Save Changes' : 'Add Vocabulary'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showBatchModal}
        onHide={handleBatchModalClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Batch Import Vocabulary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && (
            <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
              {errorMessage}
            </Alert>
          )}

          {!showPasteArea ? (
            <div className="mb-3">
              <Button variant="outline-secondary" onClick={handleShowPasteArea}>
                Paste from Excel
              </Button>
              <small className="text-muted ms-2">
                Copy data from Excel with columns: word, ipa, definition, example
              </small>
            </div>
          ) : (
            <div className="mb-3">
              <Form.Group>
                <Form.Label>Paste data from Excel (tab-separated columns)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={pasteArea}
                  onChange={handlePasteChange}
                  placeholder="Paste your Excel data here..."
                />
                <div className="mt-2">
                  <Button variant="primary" size="sm" onClick={handleProcessPaste} className="me-2">
                    Process Data
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={handleHidePasteArea}>
                    Cancel
                  </Button>
                </div>
              </Form.Group>
            </div>
          )}

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Word</th>
                <th>IPA</th>
                <th>Definition</th>
                <th>Example</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {batchData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.word}
                      onChange={(e) => handleBatchInputChange(index, 'word', e.target.value)}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.ipa}
                      onChange={(e) => handleBatchInputChange(index, 'ipa', e.target.value)}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.definition}
                      onChange={(e) => handleBatchInputChange(index, 'definition', e.target.value)}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={row.example}
                      onChange={(e) => handleBatchInputChange(index, 'example', e.target.value)}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveRow(index)}
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <Button variant="outline-secondary" onClick={handleAddRow}>
              <Plus size={16} className="me-1" />
              Add Row
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBatchModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveBatch}
            disabled={batchData.every(row => row.word.trim() === '')}
          >
            <Save size={16} className="me-1" />
            Save All
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}