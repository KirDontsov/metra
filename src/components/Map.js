import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "../scss/Map.scss";

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 44.5485625,
      lng: 38.1046673,
      zoom: 16
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default MyMap;
