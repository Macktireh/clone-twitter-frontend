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

  return (
    <div className="container-input-group">
      <div
        className={
          props.nameClass ? `input-group ${props.nameClass}` : "input-group"
        }
      >
        <input
          type={props.type ? props.type : "text"}
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
      </div>
      {props.error ? <div className="input-error">{props.error}</div> : null}
    </div>
  );
};

export default Input;
