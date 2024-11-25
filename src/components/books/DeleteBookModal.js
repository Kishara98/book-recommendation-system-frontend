import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "../../axios.js";

function DeleteButton({bookId}) {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert('Failed to delete book.');
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this book? This action cannot be undo.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes, delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;