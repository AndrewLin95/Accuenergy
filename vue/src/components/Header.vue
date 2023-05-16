<script>
  export default {
    props: {
      geoLocation: Array,
      handleGeoLocationClick: Function,
      localTime: String,
    },
    methods: {
      handleClick() {
        this.handleGeoLocationClick();
      }
    }
  }
</script>

<template>
    <div className="w-screen h-16 flex flex-row justify-around items-center">
      <div>
        <div className="font-bold">Local Time of Latest Search: </div>
        {{ localTime }}
      </div>
      <button @click="handleClick">Get Current Location</button>
      <div v-if="geoLocation.length !== 0" className="pl-8">
        <div className="font-bold">Current Location</div> 
        Latitude: {{ geoLocation.lat }} || Longitude: {{ geoLocation.lng }}
      </div>
    </div>
</template>
