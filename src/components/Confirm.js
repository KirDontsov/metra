import React, { Component, Fragment } from "react";

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();

    // Send FORM //
    let formData = this.props.values;
    console.log(formData);
    fetch("http://webclient.metrataxi.ru:8001/nil", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({
        firstAddress: formData.firstAddress,
        secondAddress: formData.secondAddress,
        additionalAddress: formData.additionalAddress,
        phone: formData.phone
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });

    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstAddress, secondAddress, additionalAddress, phone }
    } = this.props;

    return (
      <Fragment>
        <div className="quiz">
          <h2 className="dark">Проверьте правильность заполнения данных</h2>
          <div className="quiz__box">
            <ul>
              <li>Откуда: {firstAddress}</li>
              <li>Куда: {secondAddress}</li>
              <li>Дополнительный адрес: {additionalAddress}</li>
              <li>Телефон: {phone}</li>
            </ul>
          </div>
          <div className="btn__container">
            <button
              type="submit"
              variant="contained"
              onClick={this.continue}
              className="next btn"
            >
              Подтвердить и Отправить
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Confirm;
