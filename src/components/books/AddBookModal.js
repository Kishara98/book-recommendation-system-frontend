import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../axios.js";

const AddBookModal = ({ show, handleClose }) => {
  const [title, setBookTitle] = useState('');
  const [author, setBookAuthor] = useState('');
  const [genre, setBookGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add book logic here
    console.log('Adding book:', title, author);

    try {
      
      const token = localStorage.getItem('authToken');
      const response = await axios.post('/books/', {
        title,
        author,
        genre
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        alert('Book added successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert('Failed to add the book.');
    } finally {
      setLoading(false);
    }

    handleClose(); // Close the modal after adding the book
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter book title" 
              value={title} 
              onChange={(e) => setBookTitle(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Book Author</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter book author" 
              value={author} 
              onChange={(e) => setBookAuthor(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter book genre" 
              value={genre} 
              onChange={(e) => setBookGenre(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddBook}>
          Add Book
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBookModal;
