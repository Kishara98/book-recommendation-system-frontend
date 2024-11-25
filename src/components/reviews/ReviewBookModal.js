import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "../../axios.js";
import DeleteReviewButton from "../reviews/DeleteReviewButton.js";

function ReviewButton({ bookId }) {
  const [show, setShow] = useState(false);
  const [review, setReview] = useState("");
  let [rating, setRating] = useState("4");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  rating = Number(rating);
  const fetchReviews = async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await axios.get(`/reviews/?bookId=${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.length === 0) {
        setError("No reviews found!");
      } else {
        setReviews(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Adding review:", review, rating);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `/reviews/?bookId=${bookId}`,
        {
          bookId,
          review,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response>>", response);
      if (response.status === 201) {
        handleClose();
        alert("Review added successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding review:", error.message);
      alert("Failed to add the review.");
    } finally {
      setLoading(false);
    }

    handleClose(); // Close the modal after adding the book
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
console.log('reviews>>', reviews)
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="review-list">
            {reviews.length > 0 ? (
              <table className="table table-striped table-bordered review-table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Review ID</th>
                    <th scope="col">Review</th>
                    <th scope="col">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id} className="review-row">
                      <td>{review._id}</td>
                      <td>{review.review}</td>
                      <td>{review.rating}</td>
                      <td><DeleteReviewButton className="btn btn-sm btn-danger me-2" reviewId={review._id}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-reviews-found text-center">No reviews found.</p>
            )}
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="reviewControl">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add your review here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ratingControl">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddReview}>
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

export default ReviewButton;
