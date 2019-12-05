import React, { Component, Fragment } from "react";

class FormPersonalDetails extends Component {
  constructor() {
    super();
    this.state = {
      addClass: false
    };
  }
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    const { values, handleChange, disabled } = this.props;

    let addAddress = ["addAddress"];

    if (this.state.addClass) {
      addAddress.push("active");
    }
    return (
      <Fragment>
        <div className="quiz">
          <h2 className="dark">Куда направляетесь?</h2>
          <div className="quiz__box">
            <input
              label="Откуда Вас забрать?"
              onChange={handleChange("secondAddress")}
              defaultValue={values.secondAddress}
              required
            />
            {values.secondAddress.length < 3 &&
              values.secondAddress.length !== 0 && (
                <span className="errorMessage">Вы не ввели адрес</span>
              )}
            <br />
            <div className="addAddress__container">
              <button
                className="btn__addAddress"
                onClick={this.toggle.bind(this)}
              >
                +
              </button>
              <input
                className={addAddress.join(" ")}
                label="Указать дополнительный адрес при необходимости?"
                onChange={handleChange("additionalAddress")}
                defaultValue={values.additionalAddress}
                required
              />
              {values.additionalAddress.length < 3 &&
                values.additionalAddress.length !== 0 && (
                  <span className="errorMessage">Вы не ввели адрес</span>
                )}
            </div>
            <br />
          </div>
          <div className="btn__container">
            <button
              variant="contained"
              onClick={this.continue}
              className="next btn"
              disabled={disabled}
            >
              Продолжить
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FormPersonalDetails;
