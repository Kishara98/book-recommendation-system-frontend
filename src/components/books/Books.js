import React, { useEffect, useState } from "react";
import EditButton from "./EditBookModal";
import DeleteButton from "./DeleteBookModal";
import ReviewButton from "../reviews/ReviewBookModal.js";
import Header from "../header/Header.js";
import "../../css/books/Book.css";
import axios from "../../axios.js";

const BookList = ({ searchBookRsults }) => {
  console.log('searchBookRsults>>', searchBookRsults);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    
    const token = localStorage.getItem('authToken');

    setLoading(true);
    try {
      const response = await axios.get("/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.length === 0) {
        setError("No books found!");
      } else {
        setBooks(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching books:", error.message);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (books.length === 0) {
    return (
      <p className="no-books-found text-center text-muted fs-4">
        No books found. Hurry up let's add some books!
      </p>
    );
  }


return (
  <div className="book-list container my-4">
    <Header books={books} />
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle book-table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Book ID</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(searchBookRsults.length !== 0 ? searchBookRsults : books).map((book) => (
            <tr key={book._id} className="book-row">
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td className="text-center">
                <div className="btn-group">
                  <EditButton
                    className="btn btn-sm btn-primary me-2"
                    book={book}
                  />
                  <DeleteButton
                    className="btn btn-sm btn-danger me-2"
                    bookId={book._id}
                  />
                  <ReviewButton
                    bookId={book._id}
                    className="btn btn-sm btn-success"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
export default BookList;
