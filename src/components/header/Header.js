import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ( recommendedBooks ) => {
  return (
    <div className="container mt-5">
      {/* Dashboard Header */}
      <div className="text-center mb-4">
        <h1 className="display-5">📚 Book Recommendation Dashboard</h1>
        <p className="text-muted">Discover your next great read!</p>
      </div>


      {/* Stats Section */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Books</h5>
              <p className="display-6">{recommendedBooks.books.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p className="display-6">45</p> {/* Replace with real data */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Reviews</h5>
              <p className="display-6">300+</p> {/* Replace with real data */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
