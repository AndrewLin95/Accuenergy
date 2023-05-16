import GoogleMapReact from "google-map-react";
import MarkerComponent from "./MarkerComponent";


const Map = ({
  geoLocation,
  searchHistoryDisplayData,
}) => {
  if (!geoLocation) {
    return (
      <div>
        Get your current location
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API}}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={11}
        defaultCenter={{
          lat: geoLocation[0],
          lng: geoLocation[1]
        }}
      >
        <MarkerComponent 
          lat={geoLocation[0]}
          lng={geoLocation[1]}
        />
        {Object.entries(searchHistoryDisplayData).map(([key, value]) => {
          console.log(value);
          return (
            <MarkerComponent 
              key={value.id}
              lat={value.lat}
              lng={value.lon}
              location={value.location}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map;