import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => {
            const isIconify =
              skills.fontAwesomeClassname &&
              skills.fontAwesomeClassname.includes(":");

            return (
              <li
                key={i}
                className="software-skill-inline"
                name={skills.skillName}
              >
                {isIconify ? (
                  <span
                    className="iconify"
                    data-icon={skills.fontAwesomeClassname}
                    data-inline="false"
                  ></span>
                ) : (
                  <i className={skills.fontAwesomeClassname}></i>
                )}
                <p>{skills.skillName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
