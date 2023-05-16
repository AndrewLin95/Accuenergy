<script>
import Header from './components/Header.vue';
import SearchModule from './components/SearchModule.vue';

export default {
  components: {
    Header,
    SearchModule
  },
  data() {
    return {
      geoLocation: []
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
    }
  }
}

</script>

<template>
  <div className="border border-red-500 w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
    <Header :geoLocation="geoLocation" :handleGeoLocationClick="handleGeoLocationClick" />
    <div className='flex flex-row w-full h-full'>
      <SearchModule />
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
