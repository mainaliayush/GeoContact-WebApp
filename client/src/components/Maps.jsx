import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
import "../index.css";

const Maps = ({contacts, flyLocation}) => {
  // const [activeLocation, setActiveLocation] = useState(null);
  console.log("Contacts inside map", contacts)
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef()

  useEffect(()=> {
    if (flyLocation.length) {
      mapRef.current.flyTo(flyLocation, 13, {
        duration: 2,
      });
    }
  }, [flyLocation])
  useEffect(() => {
    if (contacts.length) {
      let listMarkers = []
      for (let i = 0; i < contacts.length; i++){
        listMarkers.push({coordinates: contacts[i].coordinates, text: contacts[i].address})
      }
      setMarkers(listMarkers)
    }
  }, [contacts])


  console.log("Markers", markers)
  return (
    <MapContainer
      center={[41.081509, -74.174622]}
      zoom={12}
      scrollWheelZoom={false}
      ref = {mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => {
        return (<Marker key={index} position={marker.coordinates}>
          <Popup>
            {marker.text}
          </Popup>
      </Marker>)
      })}
      
    </MapContainer>
  );
};

export default Maps;
