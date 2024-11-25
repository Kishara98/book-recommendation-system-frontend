import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "../../axios.js";

function DeleteReviewButton({reviewId}) {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlereviewDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/reviews/?reviewId=${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <Modal.Body>Do you really want to delete this review? This action cannot be undo.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handlereviewDelete}>
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

export default DeleteReviewButton;