import React from "react";
import BookList from "./Books.js";

const BookTable = ({ searchBookRsults }) => {
  return <BookList searchBookRsults={searchBookRsults} />;
};

export default BookTable;
