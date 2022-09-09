import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const Map = ({ location }) => {
    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}></Marker>
        </MapContainer>
    );
};

export default Map;
