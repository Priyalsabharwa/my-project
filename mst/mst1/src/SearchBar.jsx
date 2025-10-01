export default function SearchBar({ search, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search by cuisine..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ padding: "8px", width: "200px", marginBottom: "20px" }}
    />
  );
}

