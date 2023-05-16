import './searchHistory.css'

const MarkerComponent = ({
  location
}) => {
  console.log(location);

  return (
    <div className="wrapper text-purple-600 text-xl pl-6 pb-6">
      {location}
    </div>
  )
}

export default MarkerComponent;
