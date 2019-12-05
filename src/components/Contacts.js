import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import MaskInput from "./MaskInput";

class Contacts extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const onSubmit = args => console.log(args);
    const { values, handleChange, disabled } = this.props;
    return (
      <Form
        mutators={{
          setValue: ([address], state, utils) => {
            utils.changeValue(state, "address", () => address);
          }
        }}
        onSubmit={onSubmit}
        initialValues={{ address: "", phone: "" }}
        render={() => (
          <form noValidate>
            <Field
              name="phone"
              mask="+7 (999) 999-99-99"
              component={MaskInput}
              defaultValue={values.phone}
              type="text"
              label="Телефон"
              required
              onChange={handleChange("phone")}
            />
            {values.phone.length < 10 && values.phone.length !== 0 && (
              <span className="errorMessage">
                Введен некорректный номер телефона
              </span>
            )}
            <button
              type="submit"
              variant="contained"
              onClick={this.continue}
              className="next btn"
              disabled={disabled}
            >
              Продолжить
            </button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default Contacts;
