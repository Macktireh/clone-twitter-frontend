import React, { useState } from "react";

interface Props {
  id?: string;
  name?: string;
  nameClass?: string;
  onChange?: any;
  maxLength?: any;
  label?: string;
  type?: string;
  error?: string;
}

const Input: React.FC<Props> = (props) => {
  const [len, setLen] = useState(0);
  const [showValue, setShowValue] = useState(props.type || "");

  const toggleShowValue = () => {
    showValue === "password" ? setShowValue("text") : setShowValue("password");
  };

  return (
    <div className="container-input-group">
      <div
        className={
          props.nameClass ? `input-group ${props.nameClass}` : "input-group"
        }
      >
        <input
          type={props.type ? showValue : "text"}
          id={props.id ? props.id : ""}
          name={props.name ? props.name : ""}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            setLen(e.target.value.length);
          }}
          required
          autoComplete="off"
          maxLength={props.maxLength ? props.maxLength : ""}
        />
        <label htmlFor={props.id ? props.id : ""}>
          {props.label ? props.label : ""}
        </label>
        {len > 0 && props.maxLength && (
          <span className="maxLength">{len + "/" + props.maxLength}</span>
        )}
        {showValue === "password" && (
          <div className="showValue" onClick={toggleShowValue}>
            <img
              src={
                showValue === "password"
                  ? "/static/svg/eye-slash.svg"
                  : "/static/svg/eye.svg"
              }
              alt="showValue"
            />
          </div>
        )}
      </div>
      {props.error ? <div className="input-error">{props.error}</div> : null}
    </div>
  );
};

export default Input;
