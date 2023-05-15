
const CurrentLocationButton = ({
  handleButtonClick
}) => {
  return (
    <div className="border border-green-500 w-screen h-16">
      <button onClick={handleButtonClick}>
        Get Current Location
      </button>
    </div>
  )

}

export default CurrentLocationButton;