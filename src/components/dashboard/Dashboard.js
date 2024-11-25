import { useState } from "react";
import NavScroll from "../navbar/Navbar.js";
import BookTable from "../books/BookTable.js";

function Dashboard() {
  const [searchBookRsults, setSearchBookRsults] = useState([]);

  return (
    <div className="App">
      <NavScroll searchBookRsults={searchBookRsults} setSearchBookRsults={setSearchBookRsults} />
      <BookTable searchBookRsults={searchBookRsults} />
    </div>
  );
}

export default Dashboard;
