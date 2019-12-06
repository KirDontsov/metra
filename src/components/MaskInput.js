import React from "react";
import InputMask from "react-input-mask";
// import classnames from "classnames";

const MaskInput = props => {
  const { mask, label, onChange, value } = props;

  return (
    <div className="form-group">
      <label className="phone">{label}</label>
      <InputMask
        mask={mask}
        autoComplete="off"
        value={value}
        onChange={onChange}
        {...props.input}
      />
    </div>
  );
};

export default MaskInput;
