
const CurrentLocationButton = ({
  handleButtonClick
}) => {
  return (
    <div>
      <button onClick={handleButtonClick}>
        Get Current Location
      </button>
    </div>
  )

}

export default CurrentLocationButton;