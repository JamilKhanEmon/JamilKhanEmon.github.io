import React from "react";
import "./AdminMascot.scss";

/**
 * Interactive login mascot that tracks email typing with its eyes,
 * covers its eyes when typing a password, and peeks when "show password" is enabled.
 */
export default function AdminMascot({
  focusField = "idle",
  emailLength = 0,
  showPassword = false,
  hasError = false
}) {
  // Map email length (0..30) to subtle horizontal eye tracking (-4.5 .. +4.5)
  const clampedLen = Math.min(emailLength, 30);
  const lookX =
    focusField === "email" ? ((clampedLen / 30) * 9 - 4.5).toFixed(2) : 0;
  const lookY = focusField === "email" ? 1.5 : 0;

  const isHiding = focusField === "password" && !showPassword;
  const isPeeking = focusField === "password" && showPassword;

  return (
    <div
      className={`admin-mascot ${isHiding ? "hiding" : ""} ${
        isPeeking ? "peeking" : ""
      } ${hasError ? "error" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 140 112" width="124" height="100">
        {/* Cute Cyber Ears */}
        <polygon
          points="28,36 36,10 54,28"
          fill="#1e293b"
          stroke="#00e5ff"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <polygon
          points="112,36 104,10 86,28"
          fill="#1e293b"
          stroke="#00e5ff"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* Head */}
        <rect
          x="22"
          y="24"
          width="96"
          height="68"
          rx="28"
          fill="#0f172a"
          stroke="#6366f1"
          strokeWidth="2.6"
        />

        {/* Visor */}
        <rect x="32" y="36" width="76" height="36" rx="16" fill="#1e293b" />

        {/* Left & Right Eyes (closed/squinted when hiding, open otherwise) */}
        {isHiding ? (
          <>
            <path
              d="M44 54 Q52 48 60 54"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M80 54 Q88 48 96 54"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="52" cy="54" r="9" fill="#0f172a" />
            <circle cx="88" cy="54" r="9" fill="#0f172a" />
            <g
              style={{
                transform: `translate(${lookX}px, ${lookY}px)`,
                transition: "transform 0.15s ease-out"
              }}
            >
              <circle
                cx="52"
                cy="54"
                r="5.2"
                fill={hasError ? "#f87171" : "#00e5ff"}
              />
              <circle
                cx="88"
                cy="54"
                r="5.2"
                fill={hasError ? "#f87171" : "#00e5ff"}
              />
              <circle cx="53.8" cy="52" r="1.8" fill="#ffffff" />
              <circle cx="89.8" cy="52" r="1.8" fill="#ffffff" />
            </g>
          </>
        )}

        {/* Cute Blush Cheeks */}
        <ellipse cx="40" cy="64" rx="4.5" ry="2.4" fill="#f472b6" opacity="0.7" />
        <ellipse cx="100" cy="64" rx="4.5" ry="2.4" fill="#f472b6" opacity="0.7" />

        {/* Cute ":3" Mouth */}
        <path
          d="M64 64 Q70 70 76 64"
          fill="none"
          stroke={hasError ? "#f87171" : "#00e5ff"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Animated Paws that slide up to cover eyes on password focus */}
        <g className="mascot-paw paw-left">
          <rect
            x="32"
            y="84"
            width="28"
            height="22"
            rx="11"
            fill="#6366f1"
            stroke="#00e5ff"
            strokeWidth="2"
          />
          <circle cx="46" cy="95" r="3.5" fill="#f472b6" />
        </g>

        <g className="mascot-paw paw-right">
          <rect
            x="80"
            y="84"
            width="28"
            height="22"
            rx="11"
            fill="#6366f1"
            stroke="#00e5ff"
            strokeWidth="2"
          />
          <circle cx="94" cy="95" r="3.5" fill="#f472b6" />
        </g>
      </svg>
    </div>
  );
}
