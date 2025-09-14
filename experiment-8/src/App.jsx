import React, { useState } from "react";

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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;