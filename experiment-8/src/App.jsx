import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "C Programming", author: "Dennis Ritchie" },
    { title: "The C++ Programming Language", author: "Bjarne Stroustrup" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Add Book
  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  // Remove Book
  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // Filter Books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📚 Library Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Book */}
      <div className="add-book">
        <input
          type="text"
          placeholder="Book Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
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

