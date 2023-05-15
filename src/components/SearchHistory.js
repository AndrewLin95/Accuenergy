import './searchHistory.css'

const SearchHistory = ({
  searchHistory,
  handleDeleteSearchHistory,
  handleDeleteFlagClick
}) => {
  return (
    <div>
      <div>Searched Places</div>
      <button onClick={() => handleDeleteSearchHistory}>Delete</button>
      {Object.entries(searchHistory).map(([key, value]) => {
        return (
          <div key={key} className="searchHistoryContainer">
            <input type={'checkbox'} onClick={(e) => handleDeleteFlagClick(e.target.checked, value.id)}/>
            <div> 
              {value.location}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchHistory;
