
const Pagination = ({
  paginationState,
  handlePageChange
}) => {
  return (
    <div className="flex flex-row justify-center pb-4">
      <button className="w-12 h-12 border" onClick={() => handlePageChange("-")}>
        {"<"}
      </button>
      {Object.entries(paginationState).map(([key, value]) => {
        return (
          <button key={key} className="w-12 h-12 border" onClick={() => handlePageChange(value)}> 
            {value}
          </button>
        )
      })}
      <button className="w-12 h-12 border" onClick={() => handlePageChange("+")}>
        {">"}
      </button>
    </div>
  )
}

export default Pagination;
