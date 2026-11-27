import React, {useContext, useEffect, useState} from "react";
import {Fade} from "react-reveal";
import "./Greeting.scss";
import HeroTerminal from "../../components/heroTerminal/HeroTerminal";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import {usePortfolio} from "../../contexts/PortfolioContext";

const ROLES = [
  "Full Stack AI Engineer",
  "Multi-Agent & RAG Architect",
  "Workflow Automation Specialist",
  "Q1/Q2 ML & DL Researcher"
];

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {
    portfolio: {greeting}
  } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  if (!greeting.displayGreeting) {
    return null;
  }

  return (
    <Fade bottom duration={700} distance="24px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <div className={`availability-pill ${isDark ? "dark" : "light"}`}>
                <span className="status-dot" />
                <span>Open to AI Engineering &amp; Automation Roles</span>
              </div>

              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {greeting.title}
              </h1>

              <div className="role-rotator">
                <span className="role-prefix">&gt;_</span>
                <span key={roleIndex} className="role-badge">
                  {ROLES[roleIndex]}
                </span>
              </div>

              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>

              <div className="hero-proof-chips">
                <span className="proof-chip">1+ Yrs Experience</span>
                <span className="proof-chip">Q1/Q2 Published</span>
                <span className="proof-chip">LLM &amp; RAG Systems</span>
              </div>

              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink && (
                  <Button
                    text="Download my resume"
                    newTab={true}
                    href={
                      process.env.PUBLIC_URL
                        ? `${process.env.PUBLIC_URL}/jamil_khan.pdf`
                        : "./jamil_khan.pdf"
                    }
                    download="jamil_khan.pdf"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="greeting-image-div">
            {illustration.animated ? (
              <HeroTerminal />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              />
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
