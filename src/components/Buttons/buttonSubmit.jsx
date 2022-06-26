import React, { useState } from "react";

const Button = (props) => {
  return (
    <button
      className={props.nameClass ? `button ${props.nameClass}` : "button"}
      onClick={() => (props.handleClick ? props.handleClick() : "")}
    >
      {props.pic ? <img src={props.pic} /> : ""}
      <span className="text">{props.text ? props.text : "Submit"}</span>
    </button>
  );
};

export default Button;
