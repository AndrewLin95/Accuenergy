import './searchHistory.css'

const SearchHistory = ({
  searchHistoryDisplayData,
  handleDeleteSearchHistory,
  handleDeleteFlagClick
}) => {
  return (
    <div className='h-full'>
      <div className='flex flex-row p-4 text-2xl'>
        <div className='pr-4'>Searched Places</div>
        <button onClick={() => handleDeleteSearchHistory}>Delete</button>
      </div>
      <div className='flex flex-col justify-between items-center h-full pb-32'>
        {Object.entries(searchHistoryDisplayData).map(([key, value]) => {
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
    </div>
  )
}

export default SearchHistory;
