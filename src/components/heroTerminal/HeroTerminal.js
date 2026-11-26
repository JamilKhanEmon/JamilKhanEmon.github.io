import React, {useContext, useEffect, useRef, useState} from "react";
import StyleContext from "../../contexts/StyleContext";
import {
  bigProjects,
  contactInfo,
  educationInfo,
  greeting,
  skillsSection,
  socialMediaLinks,
  workExperiences
} from "../../portfolio";
import "./HeroTerminal.scss";

const EXAMPLE_COMMANDS = [
  "help",
  "whoami",
  "search rag",
  "skills",
  "projects",
  "experience",
  "contact",
  "clear"
];

const INITIAL_HISTORY = [
  {
    type: "system",
    text: "Welcome to Jamil's AI Studio Terminal v2.0 — type a command or click an example below."
  },
  {
    type: "cmd",
    text: "whoami"
  },
  {
    type: "accent",
    text: "Jamil Khan • Full Stack AI & Automation Engineer (LLMs, RAG, LangGraph, n8n, FastAPI, Next.js)"
  }
];

function searchPortfolio(query) {
  const q = query.toLowerCase().trim();
  if (!q) return ["Usage: search <keyword>  (e.g. search rag, search n8n)"];

  const matches = [];

  skillsSection.skills.forEach(s => {
    if (s.toLowerCase().includes(q)) matches.push(`[skill] ${s}`);
  });

  skillsSection.softwareSkills.forEach(s => {
    if (s.skillName.toLowerCase().includes(q)) {
      matches.push(`[tech]  ${s.skillName}`);
    }
  });

  workExperiences.experience.forEach(exp => {
    const hay = `${exp.company} ${exp.role} ${exp.desc}`.toLowerCase();
    if (hay.includes(q)) {
      matches.push(`[work]  ${exp.role} @ ${exp.company} (${exp.date})`);
    }
  });

  bigProjects.projects.forEach(proj => {
    const hay = `${proj.projectName} ${proj.projectDesc}`.toLowerCase();
    if (hay.includes(q)) {
      matches.push(`[proj]  ${proj.projectName} — ${proj.projectDesc}`);
    }
  });

  educationInfo.schools.forEach(ed => {
    const hay = `${ed.schoolName} ${ed.subHeader} ${ed.desc}`.toLowerCase();
    if (hay.includes(q)) {
      matches.push(`[edu]   ${ed.subHeader} @ ${ed.schoolName}`);
    }
  });

  return matches.length > 0
    ? matches
    : [`No matches found for "${query}". Try: rag, n8n, fastapi, yolo, nextjs`];
}

export default function HeroTerminal() {
  const {isDark} = useContext(StyleContext);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [cmdHistory, setCmdHistory] = useState(["whoami"]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copiedCmd, setCopiedCmd] = useState("");
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = rawCmd => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const parts = trimmed.split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    if (base === "clear" || base === "cls") {
      setHistory([]);
      return;
    }

    let outputLines = [];

    if (base === "help" || base === "ls") {
      outputLines = [
        {type: "accent", text: "Available commands:"},
        {type: "info", text: "  whoami         — About Jamil Khan"},
        {type: "info", text: "  skills         — Tech stack & capabilities"},
        {type: "info", text: "  projects       — Featured AI & engineering projects"},
        {type: "info", text: "  experience     — Work history"},
        {type: "info", text: "  education      — Academic background"},
        {type: "info", text: "  contact        — Email, WhatsApp & social links"},
        {type: "info", text: "  search <term>  — Search anything (e.g. search rag)"},
        {type: "info", text: "  goto <section> — Scroll to section (skills, projects, contact)"},
        {type: "info", text: "  clear          — Clear terminal screen"}
      ];
    } else if (base === "whoami") {
      outputLines = [
        {type: "success", text: `${greeting.title} (${greeting.username})`},
        {type: "info", text: greeting.subTitle}
      ];
    } else if (base === "skills") {
      outputLines = [
        {type: "accent", text: "Core Tech Stack:"},
        {
          type: "info",
          text: skillsSection.softwareSkills.map(s => s.skillName).join(" • ")
        },
        ...skillsSection.skills.slice(0, 4).map(s => ({
          type: "success",
          text: `• ${s}`
        }))
      ];
    } else if (base === "projects") {
      outputLines = bigProjects.projects.length
        ? bigProjects.projects.map(p => ({
            type: "success",
            text: `• ${p.projectName}: ${p.projectDesc}`
          }))
        : [
            {
              type: "info",
              text: "Run `goto projects` to view live GitHub repositories."
            }
          ];
    } else if (base === "experience") {
      outputLines = workExperiences.experience.map(e => ({
        type: "success",
        text: `• ${e.role} @ ${e.company} (${e.date})`
      }));
    } else if (base === "education") {
      outputLines = educationInfo.schools.map(ed => ({
        type: "success",
        text: `• ${ed.subHeader} — ${ed.schoolName} (${ed.duration})`
      }));
    } else if (base === "contact") {
      outputLines = [
        {type: "accent", text: `Email:    ${contactInfo.email_address}`},
        {type: "success", text: `WhatsApp: ${contactInfo.number}`},
        {type: "info", text: `GitHub:   ${socialMediaLinks.github}`},
        {type: "info", text: `LinkedIn: ${socialMediaLinks.linkedin}`}
      ];
    } else if (base === "search" || base === "find" || base === "grep") {
      const found = searchPortfolio(arg);
      outputLines = found.map(line => ({
        type: line.startsWith("No matches") ? "error" : "success",
        text: line
      }));
    } else if (base === "goto" || base === "open") {
      const targetId = arg.toLowerCase().replace(/^#/, "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({behavior: "smooth"});
        outputLines = [{type: "success", text: `Scrolling to #${targetId}...`}];
      } else {
        outputLines = [
          {
            type: "error",
            text: `Section "${targetId}" not found. Try: skills, projects, experience, education, contact`
          }
        ];
      }
    } else {
      // Fallback: treat any unknown input as a direct portfolio search
      const found = searchPortfolio(lower);
      outputLines = found.map(line => ({
        type: line.startsWith("No matches") ? "error" : "accent",
        text: line
      }));
    }

    setHistory(prev => [...prev, {type: "cmd", text: trimmed}, ...outputLines]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[nextIdx] !== undefined) {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = EXAMPLE_COMMANDS.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const handleCopyCommand = async (e, cmd) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cmd);
      }
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(""), 1400);
    } catch (err) {
      setCopiedCmd("");
    }
  };

  return (
    <div
      className={`hero-terminal ${isDark ? "dark" : "light"}`}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <div className="hero-terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="terminal-title">jamil@ai-studio ~ zsh</span>
        <span className="terminal-badge">INTERACTIVE</span>
      </div>

      <div ref={bodyRef} className="hero-terminal-body">
        {history.map((item, idx) =>
          item.type === "cmd" ? (
            <div key={idx} className="terminal-cmd-line">
              <span className="prompt">$</span>
              <span className="cmd-text">{item.text}</span>
            </div>
          ) : (
            <div key={idx} className={`output-line ${item.type}`}>
              {item.text}
            </div>
          )
        )}

        <form onSubmit={handleSubmit} className="terminal-input-form">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'search rag'..."
            aria-label="Interactive portfolio terminal input"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      <div className="hero-terminal-examples">
        <span className="examples-label">Examples (click to run):</span>
        <div className="examples-list">
          {EXAMPLE_COMMANDS.map(cmd => (
            <div
              key={cmd}
              className="example-chip"
              onClick={e => {
                e.stopPropagation();
                runCommand(cmd);
              }}
              title={`Run "${cmd}"`}
            >
              <span>{cmd}</span>
              <button
                type="button"
                className="copy-mini-btn"
                onClick={e => handleCopyCommand(e, cmd)}
                title={`Copy "${cmd}"`}
                aria-label={`Copy ${cmd}`}
              >
                {copiedCmd === cmd ? (
                  <i className="fas fa-check" />
                ) : (
                  <i className="far fa-copy" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
