import React, { Component } from "react";
import DadataSuggestions from "react-dadata-suggestions";
import MaskInput from "./MaskInput";
import "../scss/Dadata.scss";

export class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      firstAddress: "г. Геленджик, ",
      secondAddress: "г. Геленджик, ",
      additionalAddress: "г. Геленджик, ",
      phone: "",
      query: "г. Геленджик, ",
      values: "",
      data: {},
      error: null
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  setValue(suggestion) {
    console.log(suggestion);
    this.setState({ firstAddress: suggestion });
  }

  handleClick(e, that) {
    let firstAddress = JSON.stringify(that.state.firstAddress.value, 0, 2);
    fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${firstAddress}`
    )
      .then(response => response.json())
      .then(result => that.setState({ data: result }));
  }

  render() {
    const { data, values } = this.state;
    return (
      <div className="Quiz">
        <h2>Dadata test</h2>
        <DadataSuggestions
          token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
          onSelect={suggestion => this.setValue(suggestion)}
          deferRequestBy={300}
          placeholder={"Откуда Вас забрать?"}
          query={this.state.query}
        />

        <DadataSuggestions
          token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
          onSelect={suggestion => console.log("suggestion")}
          deferRequestBy={600}
          placeholder={"enter address here"}
          query={this.state.query}
        />

        <DadataSuggestions
          token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
          onSelect={suggestion =>
            this.setState({ additionalAddress: suggestion })
          }
          deferRequestBy={300}
          placeholder={"Откуда Вас забрать?"}
          defaultValue={values.additionalAddress}
          query={this.state.query}
        />

        <MaskInput
          name="phone"
          mask="+7 (999) 999-99-99"
          component={MaskInput}
          type="text"
          label="Телефон"
        />

        <pre>{JSON.stringify(this.state.firstAddress.value, 0, 2)}</pre>

        <pre>{JSON.stringify(data, 0, 2)}</pre>

        <button onClick={e => this.handleClick(e, this)}>Рассчитать</button>
      </div>
    );
  }
}

export default Quiz;
