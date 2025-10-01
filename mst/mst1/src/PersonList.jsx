export default function PersonList({ people }) {
  if (people.length === 0) {
    return <p>No people found.</p>;
  }

  return (
    <ul>
      {people.map((p) => (
        <li key={p.id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> — {p.cuisine}
        </li>
      ))}
    </ul>
  );
}

