import React from "react";

interface Props {
  id?: string;
  name?: string;
  nameClass?: string;
  value: string;
  onChange?: any;
  maxLength?: any;
  label?: string;
  type?: string;
  error?: string;
  isPasswords?: boolean;
  textarea?: boolean;
}

const InputCustom: React.FC<Props> = (props) => {
  const [len, setLen] = React.useState(0);
  const [showValue, setShowValue] = React.useState(props.type || "text");

  const toggleShowValue = () => {
    showValue === "password" ? setShowValue("text") : setShowValue("password");
  };

  return (
    <div className={props.nameClass ? `container-input-group ${props.nameClass}` : "container-input-group"}>
      <div className={props.nameClass ? `input-group ${props.nameClass}` : "input-group"}>
        {props.textarea ? (
          <textarea
            className="InputCustom"
            id={props.id ? props.id : ""}
            name={props.name ? props.name : ""}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              setLen(e.target.value.length);
            }}
            required
            autoComplete="off"
            maxLength={props.maxLength ? props.maxLength : ""}
            value={props.value}
          />
        ) : (
          <input
            className="InputCustom"
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
            value={props.value}
          />
        )}
        <label htmlFor={props.id ? props.id : ""}>{props.label ? props.label : ""}</label>
        {len > 0 && props.maxLength && <span className="maxLength">{len + "/" + props.maxLength}</span>}
        {props.isPasswords && (
          <div className="showValue" onClick={toggleShowValue}>
            <img
              src={showValue === "password" ? "/static/svg/eye-slash.svg" : "/static/svg/eye.svg"}
              alt="showValue"
            />
          </div>
        )}
      </div>
      {props.error ? <div className="input-error">{props.error}</div> : null}
    </div>
  );
};

export default InputCustom;
