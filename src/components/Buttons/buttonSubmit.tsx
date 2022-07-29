import React from "react";

interface Props {
  nameClass?: string;
  handleClick?: any;
  pic?: string;
  text?: string;
}

const Button: React.FC<Props> = (props) => {
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
