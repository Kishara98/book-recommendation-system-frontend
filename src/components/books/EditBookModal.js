import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "../../axios.js";

function EditButton({ book }) {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: ""
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || ""
      });
    }
  }, [book]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

const handleSaveChanges = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('authToken');
    const { _id } = book;
    const { title, author, genre } = formData;
    await axios.put(`/books/${_id}`, { title, author, genre }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === _id ? { ...book, title, author, genre } : book))
    );
    setShow(false);
    window.location.reload();
  } catch (error) {
    console.error('Error editing book:', error.message);
    alert('Failed to edit book.');
  }
  console.log("Updated book data:", formData);
};

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your book details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add your title here"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add your author here"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add genre here"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditButton;
