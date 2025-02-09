'use client'
import { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Form, Button, Card, InputGroup, Modal } from "react-bootstrap";
import { Search, Plus, PencilSquare, Trash, VolumeUp } from "react-bootstrap-icons";
import { VocabularyItem } from "@/types/vocabulary";

const sampleVocabularyItem: VocabularyItem[] = [
  {
    listId: 1,
    id: 1,
    word: "Synergy",
    ipa: "/ˈsɪnədʒi/",
    definition:
      "The interaction of elements that when combined produce a total effect that is greater than the sum of the individual elements.",
    example: "The merger created synergy between the two companies, increasing overall productivity.",
    imageUrl: "/placeholder.svg",
    audioUrlUS: "/us-synergy.mp3",
    audioUrlUK: "/uk-synergy.mp3",
  },
];

interface VocabularyFormData {
  word: string;
  ipa: string;
  definition: string;
  example: string;
  imageUrl?: string;
  audioUrlUS?: string;
  audioUrlUK?: string;
}

export default function VocabularyListDetail() {
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>(sampleVocabularyItem);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const initialFormData: VocabularyFormData = {
    word: "",
    ipa: "",
    definition: "",
    example: "",
    imageUrl: "",
    audioUrlUS: "",
    audioUrlUK: "",
  };

  const [formData, setFormData] = useState<VocabularyFormData>(initialFormData);

  const handleEdit = (id: number) => {
    const item = vocabularyItems.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setFormData({
        word: item.word,
        ipa: item.ipa,
        definition: item.definition,
        example: item.example,
        imageUrl: item.imageUrl,
        audioUrlUS: item.audioUrlUS,
        audioUrlUK: item.audioUrlUK,
      });
      setShowModal(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this vocabulary item?")) {
      setVocabularyItems(vocabularyItems.filter((item) => item.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      // Update existing item
      setVocabularyItems(
        vocabularyItems.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: VocabularyItem = {
        ...formData,
        id: Math.max(...vocabularyItems.map((item) => item.id)) + 1,
        listId: vocabularyItems[0].listId, // Assuming all items belong to the same list
      };
      setVocabularyItems([...vocabularyItems, newItem]);
    }
    setShowModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = vocabularyItems.filter((item) =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-4">
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
              <Button variant="primary" onClick={handleAddNew}>
                <Plus className="me-2" />
                Add New Vocabulary
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Vocabulary Cards */}
      {filteredItems.map((item) => (
        <Card key={item.id} className="mb-4">
          {/* ... (Card content remains the same) ... */}
        </Card>
      ))}

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
                  <Form.Control
                    type="text"
                    value={formData.word}
                    onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                    required
                  />
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

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group className="mb-3">
                  <Form.Label>US Audio URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.audioUrlUS}
                    onChange={(e) => setFormData({ ...formData, audioUrlUS: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>UK Audio URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.audioUrlUK}
                    onChange={(e) => setFormData({ ...formData, audioUrlUK: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* File Upload Section */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    //onChange={(e) => {
                      // Handle image upload logic here
                     // const file = e.target.files?.[0];
                      //if (file) {

                      //  // You would typically upload this to your server/storage
                      //  console.log('Image file:', file);
                      //}

                    //}}
                  />
                </Form.Group>

              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload US Audio</Form.Label>
                  <Form.Control
                    type="file"
                    accept="audio/*"
                    //onChange={(e) => {
                      // Handle US audio upload logic here
                      //const file = e.target.files?.[0];
                      //if (file) {
                      //  console.log('US audio file:', file);
                      //}

                    //}}
                  />
                </Form.Group>

              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload UK Audio</Form.Label>
                  <Form.Control
                    type="file"
                    accept="audio/*"
                    //onChange={(e) => {
                      // Handle UK audio upload logic here
                      //const file = e.target.files?.[0];
                      //if (file) {
                      //  console.log('UK audio file:', file);
                      //}


                    //}}
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

      {/* Bổ sung phần Card content đã bị bỏ qua */}
      {filteredItems.map((item) => (
        <Card key={item.id} className="mb-4">
          <Card.Body>
            <Row>
              <Col md={8}>
                <div className="mb-3">
                  <h2>{item.word}</h2>
                  <p className="text-muted font-italic">&quot;{item.ipa}&quot;</p>
                </div>
                <p>&quot;{item.definition}&quot;</p>
                <p className="text-muted font-italic">&quot;{item.example}&quot;</p>
                <Row className="align-items-center">
                  <Col>
                    {item.audioUrlUS && (
                      <Button
                        variant="light"
                        className="me-2"
                        onClick={() => new Audio(item.audioUrlUS).play()}
                      >
                        <VolumeUp /> US
                      </Button>
                    )}
                    {item.audioUrlUK && (
                      <Button
                        variant="light"
                        onClick={() => new Audio(item.audioUrlUK).play()}
                      >
                        <VolumeUp /> UK
                      </Button>
                    )}
                  </Col>
                  <Col className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.word}
                  width={200}
                  height={200}
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}