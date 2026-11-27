import React from "react";
import "./AdminMascot.scss";

/**
 * Interactive Robo-Trio (Robo-Cat, Mini Cyber-Bot, and Robo-Dog)
 * that track email typing together, cover their eyes on password focus,
 * and peek when "show password" is toggled.
 */
export default function AdminMascot({
  focusField = "idle",
  emailLength = 0,
  showPassword = false,
  hasError = false
}) {
  const clampedLen = Math.min(emailLength, 30);
  const lookX =
    focusField === "email" ? ((clampedLen / 30) * 8 - 4).toFixed(2) : 0;
  const lookY = focusField === "email" ? 1.5 : 0;

  const isHiding = focusField === "password" && !showPassword;
  const isPeeking = focusField === "password" && showPassword;
  const eyeColor = hasError ? "#f87171" : "#00e5ff";

  return (
    <div
      className={`admin-mascot-trio ${isHiding ? "hiding" : ""} ${
        isPeeking ? "peeking" : ""
      } ${hasError ? "error" : ""}`}
      aria-hidden="true"
    >
      {/* 1. Mini Cyber-Bot (Left) */}
      <svg viewBox="0 0 110 100" className="mascot-unit mascot-bot" width="82" height="74">
        <line x1="55" y1="8" x2="55" y2="22" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="55" cy="7" r="4" fill="#f472b6" className="bot-antenna" />
        <rect x="18" y="22" width="74" height="54" rx="20" fill="#0f172a" stroke="#818cf8" strokeWidth="2.4" />
        <rect x="26" y="32" width="58" height="30" rx="12" fill="#1e293b" />
        {isHiding ? (
          <>
            <path d="M36 47 Q43 42 50 47" fill="none" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M60 47 Q67 42 74 47" fill="none" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
          </>
        ) : (
          <g style={{transform: `translate(${lookX}px, ${lookY}px)`, transition: "transform 0.15s ease-out"}}>
            <rect x="38" y="42" width="9" height="10" rx="4.5" fill={eyeColor} />
            <rect x="63" y="42" width="9" height="10" rx="4.5" fill={eyeColor} />
            <circle cx="44" cy="45" r="1.5" fill="#ffffff" />
            <circle cx="69" cy="45" r="1.5" fill="#ffffff" />
          </g>
        )}
        <path d="M48 56 Q55 60 62 56" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />
        <g className="mascot-paw paw-left">
          <rect x="24" y="72" width="22" height="18" rx="9" fill="#818cf8" stroke="#00e5ff" strokeWidth="1.8" />
        </g>
        <g className="mascot-paw paw-right">
          <rect x="64" y="72" width="22" height="18" rx="9" fill="#818cf8" stroke="#00e5ff" strokeWidth="1.8" />
        </g>
      </svg>

      {/* 2. Cute Robo-Cat (Center, Main) */}
      <svg viewBox="0 0 140 112" className="mascot-unit mascot-cat" width="110" height="88">
        <polygon points="28,36 36,10 54,28" fill="#1e293b" stroke="#00e5ff" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="112,36 104,10 86,28" fill="#1e293b" stroke="#00e5ff" strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="22" y="24" width="96" height="68" rx="28" fill="#0f172a" stroke="#6366f1" strokeWidth="2.6" />
        <rect x="32" y="36" width="76" height="36" rx="16" fill="#1e293b" />
        {isHiding ? (
          <>
            <path d="M44 54 Q52 48 60 54" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M80 54 Q88 48 96 54" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="52" cy="54" r="9" fill="#0f172a" />
            <circle cx="88" cy="54" r="9" fill="#0f172a" />
            <g style={{transform: `translate(${lookX}px, ${lookY}px)`, transition: "transform 0.15s ease-out"}}>
              <circle cx="52" cy="54" r="5.2" fill={eyeColor} />
              <circle cx="88" cy="54" r="5.2" fill={eyeColor} />
              <circle cx="53.8" cy="52" r="1.8" fill="#ffffff" />
              <circle cx="89.8" cy="52" r="1.8" fill="#ffffff" />
            </g>
          </>
        )}
        <ellipse cx="40" cy="64" rx="4.5" ry="2.4" fill="#f472b6" opacity="0.7" />
        <ellipse cx="100" cy="64" rx="4.5" ry="2.4" fill="#f472b6" opacity="0.7" />
        <path d="M64 64 Q70 70 76 64" fill="none" stroke={eyeColor} strokeWidth="2.2" strokeLinecap="round" />
        <g className="mascot-paw paw-left">
          <rect x="32" y="84" width="28" height="22" rx="11" fill="#6366f1" stroke="#00e5ff" strokeWidth="2" />
          <circle cx="46" cy="95" r="3.5" fill="#f472b6" />
        </g>
        <g className="mascot-paw paw-right">
          <rect x="80" y="84" width="28" height="22" rx="11" fill="#6366f1" stroke="#00e5ff" strokeWidth="2" />
          <circle cx="94" cy="95" r="3.5" fill="#f472b6" />
        </g>
      </svg>

      {/* 3. Cute Robo-Dog (Right) */}
      <svg viewBox="0 0 116 102" className="mascot-unit mascot-dog" width="84" height="74">
        {/* Floppy cyber ears */}
        <rect x="10" y="30" width="14" height="30" rx="7" fill="#6366f1" stroke="#00e5ff" strokeWidth="1.8" />
        <rect x="92" y="30" width="14" height="30" rx="7" fill="#6366f1" stroke="#00e5ff" strokeWidth="1.8" />
        <rect x="20" y="20" width="76" height="58" rx="22" fill="#0f172a" stroke="#00e5ff" strokeWidth="2.4" />
        <rect x="28" y="31" width="60" height="32" rx="14" fill="#1e293b" />
        {isHiding ? (
          <>
            <path d="M38 46 Q45 41 52 46" fill="none" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M64 46 Q71 41 78 46" fill="none" stroke={eyeColor} strokeWidth="2.6" strokeLinecap="round" />
          </>
        ) : (
          <g style={{transform: `translate(${lookX}px, ${lookY}px)`, transition: "transform 0.15s ease-out"}}>
            <circle cx="45" cy="46" r="5" fill={eyeColor} />
            <circle cx="71" cy="46" r="5" fill={eyeColor} />
            <circle cx="46.5" cy="44.2" r="1.6" fill="#ffffff" />
            <circle cx="72.5" cy="44.2" r="1.6" fill="#ffffff" />
          </g>
        )}
        <ellipse cx="58" cy="54" rx="4.5" ry="3" fill="#f472b6" />
        <g className="mascot-paw paw-left">
          <rect x="26" y="72" width="22" height="18" rx="9" fill="#6366f1" stroke="#00e5ff" strokeWidth="1.8" />
        </g>
        <g className="mascot-paw paw-right">
          <rect x="68" y="72" width="22" height="18" rx="9" fill="#6366f1" stroke="#00e5ff" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}
