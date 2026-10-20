import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Designed &amp; Developed by Jamil Khan
        </p>
        <p className={isDark ? "dark-mode footer-subtext" : "footer-subtext"}>
          Full Stack AI &amp; Automation Engineer
        </p>
      </div>
    </Fade>
  );
}
