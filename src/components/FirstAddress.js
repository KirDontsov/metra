import React, { Component, Fragment } from "react";
import { Form, Field } from "react-final-form";
import Dadata from "./Dadata";

class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const onSubmit = args => console.log(args);
    return (
      <Fragment>
        <div className="quiz">
          <h2 className="dark">Где Вы находитесь?</h2>
          <div className="quiz__box">
            
              )}
            />
            {/* <input
              label="Откуда Вас забрать?"
              onChange={handleChange("firstAddress")}
              defaultValue={values.firstAddress}
              required
            />
            {values.firstAddress.length < 3 &&
              values.firstAddress.length !== 0 && (
                <span className="errorMessage">Вы не ввели адрес</span>
              )}
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
            </button> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FormPersonalDetails;
