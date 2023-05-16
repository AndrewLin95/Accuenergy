
const CurrentLocationButton = ({
  handleButtonClick,
  geoLocation,
}) => {
  return (
    <div className="border border-green-500 w-screen h-16 flex flex-row justify-center items-center">
      <button onClick={() => handleButtonClick()}>
        Get Current Location
      </button>
      {geoLocation ? 
        <div className="pl-8">
          Lat: {geoLocation[0]} || Lon: {geoLocation[1]}
        </div> 
        : 
        null
      }
    </div>
  )

}

export default CurrentLocationButton;