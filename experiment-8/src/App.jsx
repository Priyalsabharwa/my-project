import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "C Programming", author: "Dennis Ritchie" },
    { title: "The C++ Programming Language", author: "Bjarne Stroustrup" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Add Book
  const addBook = () => {
    if (title && author) {
      setBooks([...books, { title, author }]);
      setTitle("");
      setAuthor("");
    }
  };

  // Remove Book
  const removeBook = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  // Filter Books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📚 Library Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Book */}
      <div className="add-book">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book List */}
      <ul>
        {filteredBooks.map((book, index) => (
          <li key={index}>
            <b>{book.title}</b> by {book.author}{" "}
            <button onClick={() => removeBook(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

