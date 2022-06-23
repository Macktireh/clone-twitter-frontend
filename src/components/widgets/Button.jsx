import React from "react";

const Button = (props) => {
  return (
    <button
      className={
        props.nameClass ? `widget-btn ${props.nameClass}` : "widget-btn"
      }
    >
      {props.pic ? <img src={props.pic} /> : ""}
      {props.text ? <span className="btn-text">{props.text}</span> : ""}
    </button>
  );
};

export default Button;
