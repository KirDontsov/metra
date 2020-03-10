import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MaskInput from "./MaskInput";
import { connect } from "react-redux";
import ChangeCity from "../components/ChangeCity";
import "../scss/Quiz.scss";

const isIE = /*@cc_on!@*/ false || !!document.documentMode;

export class Quiz extends Component {
  // получение координат и построение маршрута
  handleClick(e, that) {
    // отправка fetch (получение маршрута)
    // fetch("http://webclient.metrataxi.ru:8000/metrasite", {
    //   // credentials: "same-origin",
    //   method: "POST",
    //   body: formData
    //   // headers: new Headers({
    //   // 	"Content-Type": "application/json"
    //   // })
    // }).then(response => {
    //   response.json().then(data => {
    //     console.log("Successful", data);
    //     this.props.setRes(data);
    //   });
    // });
  }

  button() {
    return (
      <div className="btn" onClick={e => this.handleClick(e, this)}>
        Отправить
      </div>
    );
  }

  render() {
    return (
      <div className="Quiz">
        <h2 className="dark">
          Приятно, <br />
          когда вместе<span>!</span>
        </h2>

        <div className="quizForm">
          <p className="quizText">Станьте водителем-партнером</p>

          <MaskInput
            name="phone"
            mask="+7 (999) 999-99-99"
            // component={MaskInput}
            formLabel="Телефон"
            type="text"
            value=""
            // onChange={e => this.props.setPhone(e.currentTarget.value)}
            fullWidth={true}
          />
          <TextField
            // onChange={e => this.props.setEmail(e.currentTarget.value)}
            value=""
            fullWidth={true}
            required
            variant="outlined"
            label="Email"
            className="phoneInput"
            // placeholder="Email"
          />

          {this.button()}
        </div>

        {/* <MaskInput
          name="phone"
          mask="+7 (999) 999-99-99"
          component={MaskInput}
          type="text"
          label="Телефон"
          onChange={e => this.props.setPhone({ phone: e.target.value })}
        /> */}
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
  res: state.Quiz.res,
  additionalInput: state.Quiz.additionalInput
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
    setRes,
    setQuery1,
    setQuery2,
    setQuery3,
    setAdditionalInput
  },
  city: { setLatitude, setLongitude }
}) => ({
  setFirstAddress,
  setSecondAddress,
  setAdditionalAddress,
  setPhone,
  setComment,
  setData1,
  setData2,
  setData3,
  setRes,
  setQuery1,
  setQuery2,
  setQuery3,
  setLatitude,
  setLongitude,
  setAdditionalInput
});

export default connect(mapState, mapDispatch)(Quiz);
