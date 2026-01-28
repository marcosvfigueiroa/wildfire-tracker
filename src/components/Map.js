import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({
  center = { lat: 42.3265, lng: -122.8756 },
  zoom = 6,
  eventData = [],
}) => {
    const [LocationInfo, setLocationInfo] = useState(null)
  const markers = eventData
    .filter((ev) => ev.categories?.some((c) => c.id === "wildfires"))

    .map((ev) => {
      const coords = ev.geometry?.[0]?.coordinates;
      if (!coords) return null;

      const lng = coords[0];
      const lat = coords[1];

      return (
        <LocationMarker
          key={ev.id}
          lat={lat}
          lng={lng}
          onClick={() => setLocationInfo({id: ev.id, title: ev.title})}
        />
      );
    });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {LocationInfo && <LocationInfoBox info={LocationInfo}/>}
    </div>
  );
};

export default Map;
