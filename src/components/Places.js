import { React, useMemo } from "react";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";


const Places = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB2iXJFwmYfwmU38sMkStb6bRWlirjXkrE",
  });

  const center = useMemo(() => ({ lat: -30.292038, lng: 153.118896 }), []);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };


  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
      <GoogleMap zoom={15} options={options} center={center} mapContainerClassName="map-container">
        <MarkerF onLoad={onLoad} position={center} />
      </GoogleMap>
  );
};

export default Places;