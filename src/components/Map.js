import React, { Component, Fragment } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  ZoomControl
} from "react-leaflet";
import RotatedMarker from "./RotatedMarker";
import L from "leaflet";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as carsActions from "../actions/cars";
// import * as coordsActions from "../actions/coords";
import axios from "axios";
import _ from "lodash";
import carIcon from "../img/car.png";

import "../scss/Map.scss";

const greenIcon = L.icon({
  iconUrl: carIcon,
  shadowUrl: null,
  shadowSize: [0, 0],
  shadowAnchor: [0, 0],
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -6]
});

class MyMap extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        latitude: "",
        longitude: ""
      },
      haveUsersLocation: false,
      zoom: 10
    };
  }

  request(that) {
    const { setCarsOnMap } = that.props;
    axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
      setCarsOnMap(_.values(data.carsList));
      // setTimeout(() => {
      //   that.request(that);
      // }, 3000);
    });
  }

  componentDidMount() {
    this.request(this);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 16
        });
      },
      () => {
        this.setState({
          location: {
            latitude: 44.560424499999996,
            longitude: 38.079167
          },
          haveUsersLocation: false,
          zoom: 15
        });
      }
    );
  }

  render() {
    const { items, isReady } = this.props;
    const position = [
      this.state.location.latitude,
      this.state.location.longitude
    ];

    return (
      <Fragment>
        <LeafletMap
          center={position}
          zoom={this.state.zoom}
          zoomControl={false}
          maxZoom={20}
          minZoom={4}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          {this.state.haveUsersLocation ? (
            <Marker position={position}>
              <Popup>
                <span>Здесь находитесь Вы</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )}

          {!isReady
            ? "Загрузка..."
            : items.map((item, i) => {
                let pos = [item.latitude, item.longitude];
                console.log(item);
                return (
                  <RotatedMarker
                    key={i}
                    position={pos}
                    icon={greenIcon}
                    rotationAngle={item.course}
                    rotationOrigin={"center"}
                  >
                    <Popup>
                      <span>{item.CarModel}</span>
                    </Popup>
                  </RotatedMarker>
                );
              })}
        </LeafletMap>
      </Fragment>
    );
  }
}

const mapState = state => ({
  items: state.setItems.items,
  isReady: state.setItems.isReady
});

const mapDispatch = dispatch => ({
  setCarsOnMap: dispatch.setItems.setItems
});

export default connect(mapState, mapDispatch)(MyMap);
