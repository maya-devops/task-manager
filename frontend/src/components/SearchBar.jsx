function SearchBar({ search, onSearchChange }) {
  return (
    <input
      className="field"
      type="text"
      placeholder="Search by title or description"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;