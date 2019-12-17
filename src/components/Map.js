import React, { Component, Fragment } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON
} from "react-leaflet";
import RotatedMarker from "./RotatedMarker";
import L from "leaflet";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as carsActions from "../actions/cars";
// import * as coordsActions from "../actions/coords";
import axios from "axios";
import _ from "lodash";
import { default as bezierSpline } from "@turf/bezier-spline";
import * as helpers from "@turf/helpers";
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
  request(that) {
    const { setCarsOnMap } = that.props;
    axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
      setCarsOnMap(_.values(data.carsList));
      setTimeout(() => {
        that.request(that);
      }, 3000);
    });
  }

  componentDidMount() {
    this.request(this);
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.props.setMapCenter({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       haveUsersLocation: true,
    //       zoom: 16
    //     });
    //   },
    //   () => {
    //     this.props.setMapCenter({
    //       latitude: 44.560424499999996,
    //       longitude: 38.079167,
    //       haveUsersLocation: false,
    //       zoom: 15
    //     });
    //   }
    // );
  }

  render() {
    const { items, isReady, zoom, latitude, longitude } = this.props;
    const position = [latitude, longitude];

    const line =
      this.props.res !== ""
        ? helpers.lineString(this.props.res.OrderCalc.pointsway)
        : null;

    const curved = this.props.res !== "" ? bezierSpline(line) : null;

    const pos1 =
      this.props.firstAddress !== "" && this.props.didFetched1 === true
        ? this.props.firstAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map(value => parseFloat(value))
        : null;

    const pos2 =
      this.props.secondAddress !== "" && this.props.didFetched1 === true
        ? this.props.secondAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map(value => parseFloat(value))
        : null;

    const pos3 =
      this.props.additionalAddress !== "" && this.props.didFetched1 === true
        ? this.props.additionalAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .reverse()
            .map(value => parseFloat(value))
        : null;

    return (
      <Fragment>
        <LeafletMap
          center={position}
          zoom={zoom}
          zoomControl={false}
          maxZoom={20}
          minZoom={4}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />

          {this.props.res !== "" ? <GeoJSON data={curved} /> : null}

          {/* {this.state.haveUsersLocation ? (
            <Marker position={position}>
              <Popup>
                <span>Здесь находитесь Вы</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )} */}

          {pos1 ? (
            <Marker position={pos1}>
              <Popup>
                <span>Здесь находитесь Вы</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )}
          {pos2 ? (
            <Marker position={pos2}>
              <Popup>
                <span>Поедем сюда</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )}
          {pos3 ? (
            <Marker position={pos3}>
              <Popup>
                <span>Заедем попути сюда</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )}

          {!isReady
            ? "Загрузка..."
            : items.map((item, i) => {
                let pos = [item.latitude, item.longitude];
                // console.log(item);
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
  isReady: state.setItems.isReady,
  firstAddress: state.Quiz.data1,
  secondAddress: state.Quiz.data2,
  additionalAddress: state.Quiz.data3,
  didFetched1: state.Quiz.didFetched1,
  didFetched2: state.Quiz.didFetched2,
  didFetched3: state.Quiz.didFetched3,
  latitude: state.setItems.latitude,
  longitude: state.setItems.longitude,
  zoom: state.setItems.zoom,
  res: state.Quiz.res
});

const mapDispatch = dispatch => ({
  setCarsOnMap: dispatch.setItems.setItems
  // setMapCenter: dispatch.setItems.setMapCenter
});

export default connect(mapState, mapDispatch)(MyMap);
