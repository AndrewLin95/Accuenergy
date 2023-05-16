import './App.css';
import { useEffect, useState } from 'react';
import CurrentLocationButton from './components/currentLocationButton';
import SearchModule from './components/SearchModule';
import SearchHistory from './components/SearchHistory';
import Pagination from './components/Pagination';

function App() {
  const [geoLocation, setGeoLocation] = useState("geolocation");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchHistoryDisplayData, setSearchHistoryDisplayData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [paginationState, setPaginationState] = useState([]);

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

    if (searchHistory.length === 0){
      setNumberOfPages(1);
    } else {
      const _numberOfPages = Math.ceil((searchHistory.length) / 10);
      if (_numberOfPages !== numberOfPages) {
        setNumberOfPages(_numberOfPages);
      }
    }

    // console.log(searchHistory)
    // // add to current page
    // if (searchHistoryDisplayData.length <= 9 && currPage === numberOfPages) {
    //   setSearchHistoryDisplayData([...searchHistoryDisplayData, searchObject])
    // }

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
      debugger;
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

  // const handlePaginationUpdate = () => {
  //   if (numberOfPages <= 5) {
  //     let i = 0;
  //     const tempPaginationArray = [];
  //     while (i < numberOfPages) {
  //       tempPaginationArray.push(i + 1);
  //       i++
  //     }
  //     setPaginationState(tempPaginationArray);
  //   } else {
  //     if (currPage <= 2) {
  //       setPaginationState([1, 2, 3, "...", numberOfPages]);
  //     } else if (currPage >= (numberOfPages - 2)) {
  //       setPaginationState([1, "...", currPage, numberOfPages - 1, numberOfPages]);
  //     } else {
  //       setPaginationState([1, "...", currPage - 1, currPage, currPage + 1, "...", numberOfPages]);
  //     }
  //   }
  // }

  const handlePageChange = (value) => {
    const indexOfLastPost = value * 10; 
    const indexOfFirstPost = indexOfLastPost - 10;

    const tempSearchHistory = [...searchHistory];
    const filteredSearchHistory = tempSearchHistory.splice(indexOfFirstPost, indexOfLastPost);

    setCurrPage(value);
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
                searchHistoryDisplayData={searchHistoryDisplayData}
                handleDeleteSearchHistory={handleDeleteSearchHistory}
                handleDeleteFlagClick={handleDeleteFlagClick}
              />
              <Pagination 
                currPage={currPage}
                numberOfPages={numberOfPages}
                paginationState={paginationState}
                handlePageChange={handlePageChange}
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
