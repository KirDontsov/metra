import React, { Component, Fragment } from "react";
import DadataSuggestions from "react-dadata-suggestions";
import MaskInput from "./MaskInput";
import { connect } from "react-redux";
import "../scss/Quiz.scss";

const isIE = /*@cc_on!@*/ false || !!document.documentMode;

export class Quiz extends Component {
  generateId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  handleClick(e, that) {
    let firstAddress = JSON.stringify(that.props.firstAddress.value, 0, 2);
    let secondAddress = JSON.stringify(that.props.secondAddress.value, 0, 2);
    let additionalAddress = JSON.stringify(
      that.props.additionalAddress.value,
      0,
      2
    );

    if (firstAddress !== undefined || null || "") {
      fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${firstAddress}`
      )
        .then(response => response.json())
        .then(result => that.props.setData1(result));
    }

    if (secondAddress !== undefined || null || "") {
      fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${secondAddress}`
      )
        .then(response => response.json())
        .then(result => that.props.setData2(result));
    }
    if (additionalAddress !== undefined || null || "") {
      fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${additionalAddress}`
      )
        .then(response => response.json())
        .then(result => {
          that.props.setData3(result);
        });
    }

    setTimeout(() => {
      if (this.props.didFetched1 === true && this.props.didFetched2 === true) {
        // console.log(this.props.data1);
        let coords1 = this.props.data1.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map(c => parseFloat(c));
        let coords2 = this.props.data2.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map(c => parseFloat(c));
        let coords3 = "";
        if (this.props.data3 !== "" || null || undefined) {
          coords3 = this.props.data3.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .map(c => parseFloat(c));
        }

        let AddressА = this.props.data1.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
          word => ["locality", "street", "house"].includes(word.kind)
        )
          .map(word => word.name)
          .join(", ");

        let AddressB = this.props.data2.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
          word => ["locality", "street", "house"].includes(word.kind)
        )
          .map(word => word.name)
          .join(", ");

        let Address1 = "";
        if (this.props.data3 !== "" || null || undefined) {
          Address1 = this.props.data3.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.filter(
            word => ["locality", "street", "house"].includes(word.kind)
          )
            .map(word => word.name)
            .join(", ");
        }

        let formData = JSON.stringify({
          OUID: this.generateId(),
          Points: [AddressА, Address1, AddressB].filter(item => item !== ""),
          phone: this.props.phone,
          comment: this.props.comment,
          roadway: [coords1, coords3, coords2].filter(item => item !== "")
        });
        fetch("http://webclient.metrataxi.ru:8000/metrasite", {
          // credentials: "same-origin",
          method: "POST",
          body: formData
          // headers: new Headers({
          // 	"Content-Type": "application/json"
          // })
        }).then(response => {
          response.json().then(data => {
            console.log("Successful", data);
            this.props.setRes(data);
          });
        });
      }
    }, 1000);
  }

  getDuration() {
    const rideDuration =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.duration, 0, 2)
        : 0;
    const d = new Date(rideDuration * 1000);
    const minutes = d.getMinutes();

    return " " + minutes + " мин.";
  }

  getCost() {
    const rideCost =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.RideCost, 0, 2) / 100
        : 0;

    return " " + rideCost + " руб.";
  }

  getDistance() {
    const rideDistance =
      this.props.res !== ""
        ? JSON.stringify(this.props.res.OrderCalc.distance, 0, 2)
        : 0;

    return " " + rideDistance / 1000 + " км";
  }

  button() {
    if (isIE) {
      return (
        <div>
          Чтобы рассчитать стоимость поездки, откройте страницу в более
          современном браузере, например: Chrome, FireFox, Safari, Opera, Edge
        </div>
      );
    } else {
      return (
        <button className="btn" onClick={e => this.handleClick(e, this)}>
          Рассчитать
        </button>
      );
    }
  }

  render() {
    const {
      // data1,
      // data2,
      // data3,
      query1,
      query2,
      query3,
      firstAddress,
      secondAddress,
      additionalAddress,
      phone,
      comment
    } = this.props;
    const firstAddressQuery = JSON.stringify(firstAddress.value, 0, 2);
    const secondAddressQuery = JSON.stringify(secondAddress.value, 0, 2);
    const additionalAddressQuery = JSON.stringify(
      additionalAddress.value,
      0,
      2
    );

    return (
      <div className="Quiz">
        <h2 className="dark">Рассчитать стоимость поездки</h2>
        {!isIE ? (
          <Fragment>
            <label className="address">Откуда?</label>
            <DadataSuggestions
              label="Откуда?"
              token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
              onSelect={suggestion => this.props.setFirstAddress(suggestion)}
              deferRequestBy={300}
              placeholder={"Откуда Вас забрать?"}
              query={
                firstAddressQuery === undefined || null || ""
                  ? query1
                  : firstAddressQuery
              }
            />
            <label className="address">Куда?</label>
            <DadataSuggestions
              token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
              onSelect={suggestion => this.props.setSecondAddress(suggestion)}
              deferRequestBy={600}
              placeholder={"Куда поедем?"}
              query={
                secondAddressQuery === undefined || null || ""
                  ? query2
                  : secondAddressQuery
              }
            />
          </Fragment>
        ) : null}
        {/* <label className="address">Дополнительный адрес?</label>
        <DadataSuggestions
          token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
          onSelect={suggestion => this.props.setAdditionalAddress(suggestion)}
          deferRequestBy={300}
          placeholder={"Дополнительный адрес?"}
          query={
            additionalAddressQuery === undefined || null || ""
              ? query3
              : additionalAddressQuery
          }
        />

        <MaskInput
          name="phone"
          mask="+7 (999) 999-99-99"
          component={MaskInput}
          type="text"
          label="Телефон"
          onChange={e => this.props.setPhone({ phone: e.target.value })}
        />
        <div className="form-group">
          <label className="comment">Комментарий водителю</label>
          <input
            name="comment"
            type="text"
            onChange={e => this.props.setComment({ comment: e.target.value })}
          />
        </div> */}

        {this.button()}

        {!isIE ? (
          <ul className="coords">
            <li>
              Время в пути:
              {this.getDuration()}
            </li>
            <li>
              Стоимость поездки:
              {this.getCost()}
            </li>
            <li>
              Расстояние:
              {this.getDistance()}
            </li>
            <li>{JSON.stringify(phone.phone, 0, 2)}</li>
            <li>{JSON.stringify(comment.comment, 0, 2)}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  firstAddress: state.Quiz.firstAddress,
  secondAddress: state.Quiz.secondAddress,
  additionalAddress: state.Quiz.additionalAddress,
  phone: state.Quiz.phone,
  comment: state.Quiz.comment,
  query1: state.Quiz.query1,
  query2: state.Quiz.query2,
  query3: state.Quiz.query3,
  data1: state.Quiz.data1,
  data2: state.Quiz.data2,
  data3: state.Quiz.data3,
  didFetched1: state.Quiz.didFetched1,
  didFetched2: state.Quiz.didFetched2,
  didFetched3: state.Quiz.didFetched3,
  res: state.Quiz.res
});

const mapDispatch = ({
  Quiz: {
    setFirstAddress,
    setSecondAddress,
    setAdditionalAddress,
    setPhone,
    setComment,
    setData1,
    setData2,
    setData3,
    setRes
  }
}) => ({
  setFirstAddress,
  setSecondAddress,
  setAdditionalAddress,
  setPhone,
  setComment,
  setData1,
  setData2,
  setData3,
  setRes
});

export default connect(mapState, mapDispatch)(Quiz);