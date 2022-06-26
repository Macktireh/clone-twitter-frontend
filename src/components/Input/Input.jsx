import React from "react";

const Input = (props) => {
  return (
    <div
      className={
        props.nameClass ? `input-group ${props.nameClass}` : "input-group"
      }
    >
      <input
        type={props.type ? props.type : "text"}
        id={props.id ? props.id : ""}
        onChange={() => (props.handleChange ? props.handleChange() : "")}
        required
        autoComplete="off"
      />
      <label htmlFor={props.id ? props.id : ""}>
        {props.label ? props.label : ""}
      </label>
    </div>
  );
};

export default Input;
