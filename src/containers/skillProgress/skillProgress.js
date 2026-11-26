import React, {useContext} from "react";
import "./Progress.scss";
import {techStack} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const BENTO_CATEGORIES = [
  {
    tag: "01 / AI & AGENTS",
    title: "LLMs, RAG & Multi-Agent Systems",
    desc: "End-to-end orchestration with memory, tool calling, and low-latency vector retrieval.",
    items: ["LangGraph", "CrewAI", "LangChain", "GPT-4o", "Gemini", "Ollama", "pgvector"]
  },
  {
    tag: "02 / AUTOMATION",
    title: "Workflows & Headless Crawlers",
    desc: "Resilient data pipelines, webhook automation, and browser/API scraping at scale.",
    items: ["n8n", "OpenClaw", "Meta Ads API", "Playwright", "Redis Queues"]
  },
  {
    tag: "03 / FULL STACK",
    title: "High-Performance APIs & UI",
    desc: "Production-grade microservices paired with responsive, accessible React/Next.js frontends.",
    items: ["FastAPI", "Next.js 15", "React", "TypeScript", "Django", "PostgreSQL"]
  },
  {
    tag: "04 / VISION & CLOUD",
    title: "Computer Vision, ML & DevOps",
    desc: "Q1/Q2 published medical imaging research and containerized VPS/Cloud deployments.",
    items: ["YOLO11", "PyTorch", "EasyOCR", "OpenCV", "Docker", "Nginx", "CI/CD"]
  }
];

export default function StackProgress() {
  const {isDark} = useContext(StyleContext);

  if (!techStack.viewSkillBars) {
    return null;
  }

  return (
    <Fade bottom duration={700} distance="20px">
      <section className="bento-stack-section" id="proficiency">
        <div className="bento-header">
          <span className="bento-eyebrow">CORE CAPABILITIES</span>
          <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>
            Engineering Stack &amp; Architecture
          </h1>
        </div>

        <div className="bento-grid">
          {BENTO_CATEGORIES.map(cat => (
            <article
              key={cat.tag}
              className={`bento-card ${isDark ? "dark" : "light"}`}
            >
              <span className="bento-tag">{cat.tag}</span>
              <h3 className="bento-title">{cat.title}</h3>
              <p className="bento-desc">{cat.desc}</p>
              <div className="bento-pills">
                {cat.items.map(item => (
                  <span key={item} className="bento-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Fade>
  );
}
