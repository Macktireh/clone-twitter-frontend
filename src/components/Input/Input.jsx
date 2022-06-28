import React, { useState } from "react";

const Input = (props) => {
  const [entry, setEntry] = useState("");
  const [len, setLen] = useState(0);
  const [activeWeak, setActiveWeak] = useState("");
  const [activeMedium, setActiveMedium] = useState("");
  const [activeStrong, setActiveStrong] = useState("");

  const handleLength = (e) => {
    setLen(e.target.value.length);
  };

  const handlePasswordChecker = (e) => {
    let regExpWeak = /[a-zA-Z]/;
    let regExpMedium = /\d+/;
    let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
    let no;
    console.log(entry.match(regExpStrong));
    setEntry(e.target.value);
    if (entry !== "") {
      // indicator.style.display = "block";
      if (
        e.target.value.length <= 3 &&
        (e.target.value.match(regExpWeak) ||
          e.target.value.match(regExpMedium) ||
          e.target.value.match(regExpStrong))
      )
        no = 1;
      if (
        e.target.value.length >= 7 &&
        ((e.target.value.match(regExpWeak) &&
          e.target.value.match(regExpMedium)) ||
          (e.target.value.match(regExpMedium) &&
            e.target.value.match(regExpStrong)) ||
          (e.target.value.match(regExpWeak) &&
            e.target.value.match(regExpStrong)))
      )
        no = 2;
      if (
        e.target.value.length >= 8 &&
        e.target.value.match(regExpWeak) &&
        e.target.value.match(regExpMedium) &&
        e.target.value.match(regExpStrong)
      )
        no = 3;
      if (no === 1) {
        setActiveWeak("active");
      }
      if (no === 2) {
        setActiveMedium("active");
      } else {
        setActiveMedium("");
      }
      if (no === 3) {
        setActiveWeak("active");
        setActiveMedium("active");
        setActiveStrong("active");
      } else {
        setActiveStrong("");
      }
    }
  };

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
          onChange={(e) => {
            props.handleChange && props.handleChange(e);
            handleLength(e);
            handlePasswordChecker(e);
          }}
          required
          autoComplete="off"
          maxLength={props.maxLength ? props.maxLength : ""}
          value={entry}
        />
        <label htmlFor={props.id ? props.id : ""}>
          {props.label ? props.label : ""}
        </label>
        {len > 0 && props.maxLength && (
          <span className="maxLength">{len + "/" + props.maxLength}</span>
        )}
      </div>
      {props.passwordValidations && (
        <div className="indicator" style={{ display: entry !== "" && "flex" }}>
          <span className={"weak " + activeWeak}></span>
          <span className={"medium " + activeMedium}></span>
          <span className={"strong " + activeStrong}></span>
        </div>
      )}
      {props.error ? <div className="input-error">{props.error}</div> : null}
    </div>
  );
};

export default Input;
