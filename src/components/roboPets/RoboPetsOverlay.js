import React, {useEffect, useRef, useState} from "react";
import "./RoboPetsOverlay.scss";

/**
 * Cute Chibi Robo-Cat & Robo-Dog confined strictly inside the desk illustration card.
 * Gently patrol near the table and pause to rest/blink without ever leaving the card.
 */
export default function RoboPetsOverlay() {
  const containerRef = useRef(null);
  const catRef = useRef(null);
  const dogRef = useRef(null);
  const [catBubble, setCatBubble] = useState("");
  const [dogBubble, setDogBubble] = useState("");

  useEffect(() => {
    const motionQuery =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (typeof window === "undefined" || (motionQuery && motionQuery.matches)) {
      return;
    }

    let frameId;

    // Percentages inside .skills-image-div right around the coding desk
    const cat = {
      xPct: 31,
      targetPct: 40,
      minPct: 26,
      maxPct: 43,
      speed: 0.065,
      facingRight: true,
      pauseUntil: 0
    };

    const dog = {
      xPct: 58,
      targetPct: 51,
      minPct: 49,
      maxPct: 66,
      speed: 0.07,
      facingRight: false,
      pauseUntil: 0
    };

    const updatePet = (pet, el, now) => {
      if (!el) return;

      if (now < pet.pauseUntil) {
        el.dataset.moving = "false";
        return;
      }

      const diff = pet.targetPct - pet.xPct;
      if (Math.abs(diff) < 0.4) {
        el.dataset.moving = "false";
        pet.pauseUntil = now + 2600 + Math.random() * 2200;
        pet.targetPct =
          pet.minPct + Math.random() * (pet.maxPct - pet.minPct);
        return;
      }

      el.dataset.moving = "true";
      const dir = diff > 0 ? 1 : -1;
      pet.xPct += dir * pet.speed;
      pet.facingRight = dir > 0;

      el.style.left = `${pet.xPct.toFixed(2)}%`;
      const flipEl = el.querySelector(".pet-flip");
      if (flipEl) {
        flipEl.style.transform = pet.facingRight ? "scaleX(1)" : "scaleX(-1)";
      }
    };

    const tick = now => {
      updatePet(cat, catRef.current, now);
      updatePet(dog, dogRef.current, now);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const showBubble = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 1800);
  };

  return (
    <div ref={containerRef} className="desk-robo-pets" aria-hidden="true">
      {/* Cute Chibi Robo-Cat */}
      <div
        ref={catRef}
        className="robo-pet robo-pet-cat"
        style={{left: "31%"}}
        onClick={() => showBubble(setCatBubble, "nyaa~ ♥")}
      >
        {catBubble && <span className="pet-bubble">{catBubble}</span>}
        <div className="pet-flip">
          <svg viewBox="0 0 90 74" width="66" height="54">
            {/* Cute curled tail */}
            <path
              className="pet-tail"
              d="M18 48 Q4 34 13 22 Q18 17 22 23"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            {/* Tiny paws */}
            <ellipse
              className="pet-leg leg-a"
              cx="29"
              cy="61"
              rx="5.5"
              ry="4"
              fill="#818cf8"
            />
            <ellipse
              className="pet-leg leg-b"
              cx="50"
              cy="61"
              rx="5.5"
              ry="4"
              fill="#818cf8"
            />
            {/* Chubby round robo body */}
            <rect
              x="20"
              y="38"
              width="38"
              height="22"
              rx="11"
              fill="#1e293b"
              stroke="#818cf8"
              strokeWidth="2.2"
            />
            {/* Cute heart LED on chest */}
            <circle cx="39" cy="49" r="3.5" fill="#f472b6" className="pet-led" />
            {/* Big round chibi head */}
            <rect
              x="38"
              y="14"
              width="36"
              height="29"
              rx="14"
              fill="#1e293b"
              stroke="#00e5ff"
              strokeWidth="2.2"
            />
            {/* Cute rounded cat ears */}
            <path
              d="M42 18 L45 6 L54 15 Z"
              fill="#334155"
              stroke="#00e5ff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M58 15 L67 6 L70 18 Z"
              fill="#334155"
              stroke="#00e5ff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Dark visor face */}
            <rect x="43" y="21" width="26" height="15" rx="7.5" fill="#0f172a" />
            {/* Big sparkling kawaii eyes */}
            <circle cx="50.5" cy="28" r="3.4" fill="#00e5ff" className="pet-eye" />
            <circle cx="61.5" cy="28" r="3.4" fill="#00e5ff" className="pet-eye" />
            <circle cx="51.6" cy="26.8" r="1.1" fill="#ffffff" />
            <circle cx="62.6" cy="26.8" r="1.1" fill="#ffffff" />
            {/* Cute pink blush cheeks */}
            <ellipse cx="45.5" cy="32" rx="2.4" ry="1.3" fill="#f472b6" opacity="0.8" />
            <ellipse cx="66.5" cy="32" rx="2.4" ry="1.3" fill="#f472b6" opacity="0.8" />
            {/* Tiny ":3" mouth */}
            <path
              d="M54 31.5 Q56 33.5 58 31.5"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Cute Chibi Robo-Dog */}
      <div
        ref={dogRef}
        className="robo-pet robo-pet-dog"
        style={{left: "58%"}}
        onClick={() => showBubble(setDogBubble, "woof! ♥")}
      >
        {dogBubble && <span className="pet-bubble">{dogBubble}</span>}
        <div className="pet-flip">
          <svg viewBox="0 0 96 76" width="72" height="56">
            {/* Cute wagging antenna tail */}
            <g className="pet-tail">
              <line
                x1="20"
                y1="44"
                x2="9"
                y2="29"
                stroke="#818cf8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="8" cy="27" r="3.8" fill="#00e5ff" />
            </g>
            {/* Cute stubby robo paws */}
            <rect
              className="pet-leg leg-a"
              x="25"
              y="54"
              width="9"
              height="10"
              rx="4.5"
              fill="#6366f1"
            />
            <rect
              className="pet-leg leg-b"
              x="49"
              y="54"
              width="9"
              height="10"
              rx="4.5"
              fill="#6366f1"
            />
            {/* Round puppy chassis */}
            <rect
              x="19"
              y="36"
              width="44"
              height="22"
              rx="11"
              fill="#0f172a"
              stroke="#6366f1"
              strokeWidth="2.2"
            />
            {/* Collar & heart tag */}
            <rect x="48" y="37" width="12" height="4" rx="2" fill="#f472b6" />
            <circle cx="34" cy="47" r="3.5" fill="#00e5ff" className="pet-led" />
            {/* Big cute puppy head */}
            <rect
              x="44"
              y="12"
              width="38"
              height="30"
              rx="14"
              fill="#0f172a"
              stroke="#00e5ff"
              strokeWidth="2.2"
            />
            {/* Floppy cute robo-ears */}
            <rect
              x="39"
              y="18"
              width="9"
              height="16"
              rx="4.5"
              fill="#6366f1"
              stroke="#00e5ff"
              strokeWidth="1.4"
            />
            <rect
              x="77"
              y="18"
              width="9"
              height="16"
              rx="4.5"
              fill="#6366f1"
              stroke="#00e5ff"
              strokeWidth="1.4"
            />
            {/* Visor face */}
            <rect x="49" y="19" width="28" height="16" rx="8" fill="#1e293b" />
            {/* Big bright puppy eyes */}
            <circle cx="57" cy="26" r="3.5" fill="#00e5ff" className="pet-eye" />
            <circle cx="69" cy="26" r="3.5" fill="#00e5ff" className="pet-eye" />
            <circle cx="58.2" cy="24.8" r="1.2" fill="#ffffff" />
            <circle cx="70.2" cy="24.8" r="1.2" fill="#ffffff" />
            {/* Cute nose & blush */}
            <ellipse cx="63" cy="30" rx="2.5" ry="1.8" fill="#f472b6" />
            <ellipse cx="52.5" cy="30.5" rx="2.3" ry="1.3" fill="#f472b6" opacity="0.75" />
            <ellipse cx="73.5" cy="30.5" rx="2.3" ry="1.3" fill="#f472b6" opacity="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}
