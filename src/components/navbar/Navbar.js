import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import AddBookModal from "../books/AddBookModal.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/navbar/Navbar.css";
import axios from "../../axios.js";

function NavScroll({ setSearchBookRsults }) {
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("An error occurred while logging out.");
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/books/", {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchBookRsults(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      alert("An error occurred while fetching books.");
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-dark text-white">
        <Container fluid>
          <Navbar.Brand href="#" className="text-white">
            Book Recommendation System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Button variant="primary" onClick={handleShowModal}>
                Add a book
              </Button>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                className="me-2"
                value={searchParams.title}
                onChange={handleSearchChange}
              />
              <Form.Control
                type="text"
                placeholder="Author"
                name="author"
                className="me-2"
                value={searchParams.author}
                onChange={handleSearchChange}
              />
              <Form.Control
                type="text"
                placeholder="Genre"
                name="genre"
                className="me-2"
                value={searchParams.genre}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            <Button variant="primary" onClick={handleLogout} className="ms-3">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AddBookModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default NavScroll;
