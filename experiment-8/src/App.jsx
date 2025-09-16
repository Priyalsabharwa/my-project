import React, { useState } from "react";
<<<<<<< HEAD

function App() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ border: "1px solid black", padding: "15px", margin: "10px" }}>
      <h2>Library Management</h2>

      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "250px" }}
      />

      <input
        type="text"
        placeholder="New book title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="New book author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        style={{ marginLeft: "5px" }}
      />
      <button onClick={addBook} style={{ marginLeft: "5px" }}>
        Add Book
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {filteredBooks.map((book, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              marginBottom: "5px",
            }}
          >
            <strong>{book.title}</strong> by {book.author}
            <button
              onClick={() => removeBook(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
=======
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
>>>>>>> 8153e36459ff4bd9a3c6c5c43d5c98712f344f3d
          </li>
        ))}
      </ul>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;

>>>>>>> 8153e36459ff4bd9a3c6c5c43d5c98712f344f3d
