import { useState } from "react";
import SearchBar from "./SearchBar";
import PersonList from "./PersonList";


export default function App() {
  // Initial people
  const [people, setPeople] = useState([
    { id: 1, name: "Priyanshi", cuisine: "Italian" },
    { id: 2, name: "Rajat", cuisine: "Japanese" },
    { id: 3, name: "Lotus", cuisine: "Mexican" },
  ]);

  const [search, setSearch] = useState(""); 
  const [newName, setNewName] = useState(""); 
  const [newCuisine, setNewCuisine] = useState("");

  
  const filteredPeople = people.filter((p) =>
    p.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() === "" || newCuisine.trim() === "") return;

    const newPerson = {
      id: people.length + 1,
      name: newName,
      cuisine: newCuisine,
    };

    setPeople([...people, newPerson]);
    setNewName("");
    setNewCuisine("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>👥 People List</h1>

      {/* Search Bar */}
      <SearchBar search={search} onSearchChange={setSearch} />

      {/* Add New Person */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter cuisine..."
          value={newCuisine}
          onChange={(e) => setNewCuisine(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px" }}>Add Person</button>
      </form>

      {/* People List */}
      <PersonList people={filteredPeople} />
    </div>
  );
}

