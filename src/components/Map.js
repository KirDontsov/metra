import React, { Component, Fragment } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import GeoLocation from "./Geolocation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carsActions from "../actions/cars";
// import * as coordsActions from "../actions/coords";
import axios from "axios";
import _ from "lodash";

import "../scss/Map.scss";

const greenIcon = L.icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 44.5604632,
      longitude: 38.079259,
      zoom: 16
    };
  }

  request(that) {
    const { setItems } = that.props;
    axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
      setItems(_.values(data));
      setTimeout(() => {
        that.request(that);
      }, 5000);
    });
  }

  componentDidMount() {
    this.request(this);
  }

  render() {
    const { cars, isReady } = this.props;
    const position = [this.state.latitude, this.state.longitude];
    return (
      <Fragment>
        <ul>
          {!isReady
            ? "Загрузка..."
            : cars[0].map((item, i) => (
                <li key={i}>
                  {item.latitude} | {item.longitude} | {item.CarModel}
                </li>
              ))}
        </ul>
        <LeafletMap center={position} zoom={this.state.zoom}>
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          {!isReady
            ? "Загрузка..."
            : cars[0].map((item, i) => {
                let pos = [item.latitude, item.longitude];
                return (
                  <Marker key={i} position={pos} icon={greenIcon}>
                    <Popup>
                      <span>{item.CarModel}</span>
                    </Popup>
                  </Marker>
                );
              })}
        </LeafletMap>
        <GeoLocation />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ cars }) => ({
  cars: cars.items,
  // coords: coords.items,
  isReady: cars.isReady
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(carsActions, dispatch)
  // ...bindActionCreators(coordsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
