
const SearchModule = ({
  handleSearchText,
  searchLocation,
  handleSearchButton
}) => {
  return (
    <div className="flex flex-row p-4">
      <input className="text-black w-2/3 mr-2" value={searchLocation} onChange={(e) => handleSearchText(e.target.value)}/>
      <button onClick={handleSearchButton}>Search</button>
    </div>
  )
}

export default SearchModule;