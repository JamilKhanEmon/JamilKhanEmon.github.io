import React, {useState, useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";

const ToggleSwitch = () => {
  const {isDark} = useContext(StyleContext);
  const [isChecked, setChecked] = useState(isDark);
  const styleContext = useContext(StyleContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => {
          styleContext.changeTheme();
          setChecked(!isChecked);
        }}
      />
      <span className="slider round">
        <span className="theme-icon">
          {isChecked ? (
            <i className="fas fa-moon" style={{color: "#f1c40f", fontSize: "13px"}} />
          ) : (
            <i className="fas fa-sun" style={{color: "#f39c12", fontSize: "13px"}} />
          )}
        </span>
      </span>
    </label>
  );
};
export default ToggleSwitch;

