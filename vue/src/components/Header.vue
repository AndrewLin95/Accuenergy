<script>
  export default {
    props: {
      geoLocation: Array,
      handleGeoLocationClick: Function
    },
    methods: {
      handleClick() {
        this.handleGeoLocationClick();
      }
    }
  }
</script>

<template>
  <div className="border border-green-500 w-screen h-16 flex flex-row justify-center items-center">
    <button @click="handleClick">Get Current Location</button>
    <div v-if="geoLocation.length !== 0" className="pl-8">
      Latitude: {{ geoLocation.lat }} || Longitude: {{ geoLocation.lng }}
    </div>
  </div>
</template>
