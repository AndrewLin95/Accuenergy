import './App.css';
import { useEffect, useState } from 'react';
import CurrentLocationButton from './components/currentLocationButton';
import SearchModule from './components/SearchModule';
import SearchHistory from './components/SearchHistory';
import Pagination from './components/Pagination';
import Map from './components/Map';

function App() {
  const [geoLocation, setGeoLocation] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchHistoryDisplayData, setSearchHistoryDisplayData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [paginationState, setPaginationState] = useState([]);

  const handleButtonClick = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    const success = (position) => {
      setGeoLocation([
        position.coords.latitude,
        position.coords.longitude
      ])
    }
    const error = (err) => {
      console.log(`ERROR: ${err.code}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const handleSearchText = (value) => {
    setSearchLocation(value);
  }

  const handleSearchButton = async () => {
    const uid = Math.random().toString(16).slice(2)

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, {mode:'cors'})
    const weatherGeocode = await response.json();

    if (weatherGeocode.length === 0) {
      return;
    }
    console.log(weatherGeocode);

    const searchObject = {
      id: uid,
      location: weatherGeocode[0].name,
      lat: weatherGeocode[0].lat,
      lon: weatherGeocode[0].lon,
      searchTime: new Date(),
      deleteFlag: false,
    }

    if (searchHistory.length === 0){
      setNumberOfPages(1);
    } else {
      const _numberOfPages = Math.ceil((searchHistory.length) / 10);
      if (_numberOfPages !== numberOfPages) {
        setNumberOfPages(_numberOfPages);
      }
    }

    const tempSearchHistory = [...searchHistory, searchObject];
    setSearchHistory(tempSearchHistory);
    setSearchLocation("");
  }

  useEffect(() => {
    if (searchHistory.length > 0) {
      if (searchHistoryDisplayData.length <= 9 && currPage === numberOfPages) {
        setSearchHistoryDisplayData([...searchHistoryDisplayData, searchHistory[searchHistory.length - 1]]);
      }
    }
  }, [searchHistory])

  useEffect(() => {
    if (numberOfPages <= 5) {
      let i = 0;
      const tempPaginationArray = [];
      while (i < numberOfPages) {
        tempPaginationArray.push(i + 1);
        i++
      }
      setPaginationState(tempPaginationArray);
    } else {
      if (currPage === 1) {
        setPaginationState([1, 2, "...", numberOfPages]);
      } else if (currPage === 2) {
        setPaginationState([1, 2, 3, "...", numberOfPages]);
      } else if (currPage === numberOfPages) {
        setPaginationState([1, "...", currPage - 1, currPage]);
      } else if (currPage === (numberOfPages - 1)) {
        setPaginationState([1, "...", currPage -1, currPage, numberOfPages]);
      } else {
        setPaginationState([1, "...", currPage - 1, currPage, currPage + 1, "...", numberOfPages]);
      }
    }
  }, [numberOfPages, currPage]) 

  const handlePageChange = (value) => {
    if (value === "...") {
      return;
    }
    let indexOfFirstPost;
    let indexOfLastPost;
    if (value === "+") {
      if ((currPage + 1) > numberOfPages) {
        return;
      }
      indexOfLastPost = (currPage + 1) * 10; 
      indexOfFirstPost = indexOfLastPost - 10;
      setCurrPage(currPage + 1);
    } else if (value === "-") {
      if ((currPage - 1) <= 0) {
        return;
      }
      indexOfLastPost = (currPage - 1) * 10; 
      indexOfFirstPost = indexOfLastPost - 10;
      setCurrPage(currPage - 1);
    } else {
      indexOfLastPost = value * 10; 
      indexOfFirstPost = indexOfLastPost - 10;
      setCurrPage(value);
    }

    const tempSearchHistory = [...searchHistory];
    const filteredSearchHistory = tempSearchHistory.slice(indexOfFirstPost, indexOfLastPost);
    setSearchHistoryDisplayData(filteredSearchHistory)
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
          <CurrentLocationButton 
            handleButtonClick={handleButtonClick}
            geoLocation={geoLocation}
          />
          <div className='flex flex-row w-full h-full'>
            <div className='flex flex-col w-1/5 h-full border border-red-500'>
              <SearchModule 
                handleSearchText={handleSearchText} 
                searchLocation={searchLocation}
                handleSearchButton={handleSearchButton}
              />
              <SearchHistory 
                searchHistoryDisplayData={searchHistoryDisplayData}
                handleDeleteSearchHistory={handleDeleteSearchHistory}
                handleDeleteFlagClick={handleDeleteFlagClick}
              />
              <Pagination 
                paginationState={paginationState}
                handlePageChange={handlePageChange}
              />
            </div>
            <div className='h-full w-full'>
              <Map 
                geoLocation={geoLocation}
                searchHistoryDisplayData={searchHistoryDisplayData}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
