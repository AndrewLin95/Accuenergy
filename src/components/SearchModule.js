
const SearchModule = ({
  handleSearchText,
  searchLocation,
  handleSearchButton
}) => {
  return (
    <div>
      <input value={searchLocation} onChange={(e) => handleSearchText(e.target.value)}/>
      <button onClick={handleSearchButton}>Search</button>
    </div>
  )
}

export default SearchModule;