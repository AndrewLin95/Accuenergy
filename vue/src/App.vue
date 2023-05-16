<script>
import Header from './components/Header.vue';
import SearchModule from './components/SearchModule.vue';

const weatherAPI = import.meta.env.VITE_APP_WEATHER_API_KEY;

export default {
  components: {
    Header,
    SearchModule
  },
  data() {
    return {
      geoLocation: [],
      searchText: "",

      numberOfPages: 1,
      searchHistory: []
    }
  },
  methods: {
    handleGeoLocationClick() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      const success = (position) => {
        this.geoLocation = [
          position.coords.latitude,
          position.coords.longitude
        ]
      }
      const error = (err) => {
        console.log(`ERROR: ${err.code}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    },

    handleSearchText(value) {
      this.searchText = value
    },

    async handleSearchClick() {
      const uid = Math.random().toString(16).slice(2)
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.searchText}&appid=${weatherAPI}`, {mode:'cors'})
      const weatherGeocode = await response.json();

      if (weatherGeocode.length === 0) {
        return;
      }

      const searchObject = {
        id: uid,
        location: weatherGeocode[0].name,
        lat: weatherGeocode[0].lat,
        lon: weatherGeocode[0].lon,
        searchTime: new Date(),
        deleteFlag: false,
      }

      if (this.searchHistory.length === 0){
        this.numberOfPages = 1;
      } else {
        const _numberOfPages = Math.ceil((this.searchHistory.length) / 10);
        if (_numberOfPages !== this.numberOfPages) {
          this.numberOfPages = _numberOfPages;
        }
      }

      const tempSearchHistory = [...this.searchHistory, searchObject];
      this.searchHistory = tempSearchHistory
      this.searchText = ""
    },
  }
}

</script>

<template>
  <div className="border border-red-500 w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
    <Header 
      :geoLocation="geoLocation" 
      :handleGeoLocationClick="handleGeoLocationClick" 
    />
    {{ testVar }} aa
    <div className='flex flex-row w-full h-full'>
      <SearchModule 
        :handleSearchText="handleSearchText"
        :searchText="searchText"
        :handleSearchClick="handleSearchClick"
      />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
