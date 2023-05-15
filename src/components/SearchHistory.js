import './searchHistory.css'

const SearchHistory = ({
  searchHistory,
  handleDeleteSearchHistory,
  handleDeleteFlagClick
}) => {
  return (
    <div>
      <div className='flex flex-row p-4'>
        <div className='pr-4'>Searched Places</div>
        <button onClick={() => handleDeleteSearchHistory}>Delete</button>
      </div>
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
