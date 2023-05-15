import './App.css';
import { useEffect, useState } from 'react';
import CurrentLocationButton from './components/currentLocationButton';
import SearchModule from './components/SearchModule';
import SearchHistory from './components/SearchHistory';

function App() {
  const [geoLocation, setGeoLocation] = useState("geolocation");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleButtonClick = () => {
    console.log('test');

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const success = (position) => {
      console.log(position);
    }

    const error = (err) => {
      console.log(`ERROR: ${err.code}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }

  const handleSearchText = (value) => {
    setSearchLocation(value);
  }

  const handleSearchButton = () => {
    const uid = Math.random().toString(16).slice(2)
    const searchObject = {
      id: uid,
      location: searchLocation,
      lat: 'testLat',
      lon: 'testLon',
      searchTime: new Date(),
      deleteFlag: false,
    }

    const tempSearchHistory = [...searchHistory, searchObject];
    setSearchHistory(tempSearchHistory);
    setSearchLocation("");
  }

  const handleDeleteSearchHistory = () => {

  }

  const handleDeleteFlagClick = (checkboxState, id) => {
    const itemIndex = searchHistory.findIndex(searchItem => searchItem.id === id)
    const tempSearchHistory = [...searchHistory];

    if (checkboxState) {
      tempSearchHistory[itemIndex].deleteFlag = true;
    } else {
      tempSearchHistory[itemIndex].deleteFlag = false;
    }
    setSearchHistory(tempSearchHistory);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='border border-red-500 w-screen h-screen overflow-hidden flex flex-col justify-center items-center'>
          <CurrentLocationButton handleButtonClick={handleButtonClick}/>
          <div className='flex flex-row w-full h-full'>
            <div className='flex flex-col w-1/5 h-full border border-red-500'>
              <SearchModule 
                handleSearchText={handleSearchText} 
                searchLocation={searchLocation}
                handleSearchButton={handleSearchButton}
              />
              <SearchHistory 
                searchHistory={searchHistory}
                handleDeleteSearchHistory={handleDeleteSearchHistory}
                handleDeleteFlagClick={handleDeleteFlagClick}
              />
            </div>
            <div>
                {geoLocation};
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
