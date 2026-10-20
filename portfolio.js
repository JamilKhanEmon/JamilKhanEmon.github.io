/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen
const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section
const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "JamilKhanEmon",
  title: "Hi all, I'm Jamil",
  subTitle: emoji(
    "Full Stack AI Engineer with 1+ years of experience specializing in LLMs, RAG pipelines, AI Agents, and workflow automation. Skilled in FastAPI, Next.js, n8n, LangGraph, CrewAI, Docker, and Cloud/VPS. Published ML/DL researcher (Q1, Q2 journals)."
  ),
  resumeLink: "https://jamilkhanemon.github.io/jamil_khan.pdf", // আপনার লাইভ সিভির লিংক বা ড্রাইভ লিংক
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/JamilKhanEmon",
  linkedin: "https://linkedin.com/in/jamilkhanemon",
  gmail: "jamilkhan.ju@gmail.com",
  gitlab: "",
  facebook: "",
  medium: "",
  stackoverflow: "",
  instagram: "",
  twitter: "",
  display: true // Set true to display this section, defaults to false
};

// Skills Section
const skillsSection = {
  title: "What I do",
  subTitle:
    "CRAZY FULL STACK AI ENGINEER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    "Develop End-to-End Multi-Agent Systems & RAG pipelines (LangGraph, CrewAI, GPT-4o, Gemini, Ollama)",
    "Build automated workflows using n8n and Headless Web Crawlers (OpenClaw, Meta Ads & APIs)",
    "High-performance backend microservices with FastAPI, Django, Flask, Node.js, Redis & PostgreSQL",
    "Interactive, modern frontends using Next.js 15, React, TypeScript & Tailwind CSS",
    "Computer Vision & OCR applications with YOLO11, EasyOCR, OpenCV & Deep Learning models",
    "Cloud & DevOps deployment with Docker, Docker Compose, Nginx, CI/CD GitHub Actions & VPS"
  ],

  /* Iconify / Font Awesome Classnames */
  softwareSkills: [
    {skillName: "Python", fontAwesomeClassname: "logos:python"},
    {skillName: "FastAPI", fontAwesomeClassname: "logos:fastapi-icon"},
    {skillName: "Django", fontAwesomeClassname: "logos:django-icon"},
    {skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain"},
    {skillName: "n8n", fontAwesomeClassname: "simple-icons:n8n"},
    {skillName: "PyTorch", fontAwesomeClassname: "logos:pytorch-icon"},
    {skillName: "TensorFlow", fontAwesomeClassname: "logos:tensorflow"},
    {skillName: "OpenCV", fontAwesomeClassname: "logos:opencv"},
    {skillName: "Next.js", fontAwesomeClassname: "logos:nextjs-icon"},
    {skillName: "React", fontAwesomeClassname: "logos:react"},
    {skillName: "TypeScript", fontAwesomeClassname: "logos:typescript-icon"},
    {skillName: "Docker", fontAwesomeClassname: "logos:docker-icon"},
    {skillName: "PostgreSQL", fontAwesomeClassname: "logos:postgresql"},
    {skillName: "MySQL", fontAwesomeClassname: "logos:mysql-icon"},
    {skillName: "Redis", fontAwesomeClassname: "logos:redis"},
    {skillName: "AWS", fontAwesomeClassname: "logos:aws"},
    {skillName: "Linux", fontAwesomeClassname: "logos:linux-tux"},
    {skillName: "Git", fontAwesomeClassname: "logos:git-icon"}
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section
const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Jahangirnagar University",
      logo: require("./assets/images/jahangirnagarLogo.png"),
      subHeader: "M.Sc. in Applied Statistics and Data Science",
      duration: "2026 – Present",
      desc: "Dhaka, Bangladesh. Research and advanced studies focusing on Statistical Learning, Machine Learning, and Big Data Analytics.",
      descBullets: [
        "Advanced statistical inference, experimental design, and predictive modeling",
        "Deep learning architectures and applied AI research"
      ]
    },
    {
      schoolName: "Metropolitan University",
      logo: require("./assets/images/metropolitanLogo.png"),
      subHeader: "B.Sc. in Computer Science and Engineering",
      duration: "2021 – 2025",
      desc: "Sylhet, Bangladesh. Graduated with CGPA: 3.67 / 4.00.",
      descBullets: [
        "Specialized in Artificial Intelligence, Deep Learning, and Computer Vision",
        "Conducted Q1/Q2 journal research in Medical Image Processing and ML Healthcare Diagnosis"
      ]
    }
  ]
};

// Tech Stack Section (Skill Proficiency Bars)
const techStack = {
  viewSkillBars: true, // Set to true to show skill bars
  experience: [
    {
      Stack: "AI & LLM / Multi-Agent Systems / RAG",
      progressPercentage: "95%"
    },
    {
      Stack: "Workflow Automation (n8n, Web Scraping, APIs)",
      progressPercentage: "90%"
    },
    {
      Stack: "Backend Development (FastAPI, Django, Python, PostgreSQL, Redis)",
      progressPercentage: "90%"
    },
    {
      Stack: "Frontend Development (Next.js, React, TypeScript)",
      progressPercentage: "85%"
    },
    {
      Stack: "Computer Vision & OCR (YOLO11, EasyOCR, OpenCV)",
      progressPercentage: "88%"
    },
    {
      Stack: "DevOps & Cloud (Docker, CI/CD, Nginx, VPS, AWS)",
      progressPercentage: "80%"
    }
  ],
  displayCodersrank: false
};

// Work Experiences Section
const workExperiences = {
  display: true, // Set false to hide this section, defaults to true
  experience: [
    {
      role: "AI Engineer (Full Stack)",
      company: "Nibiz soft",
      companylogo: require("./assets/images/nibizLogo.png"),
      date: "July 2026 – Present",
      desc: "Dhaka, Bangladesh (On-site). End-to-end ownership from client requirements to VPS deployment (FastAPI, Next.js, Docker, CI/CD).",
      descBullets: [
        "Developed LeadGen AI: Automated lead discovery, 135-parameter website audit, Meta Ads automation, and ElevenLabs voice outreach",
        "Built AI CCTV toll system: Real-time vehicle detection, BRTA number plate OCR, and automatic toll calculation (YOLO11, EasyOCR, Flask, MySQL)",
        "DevOps: Set up production Docker Compose stacks, Nginx reverse proxy, and GitHub Actions CI/CD pipelines on Linux VPS"
      ]
    },
    {
      role: "AI Engineer",
      company: "Softvence",
      companylogo: require("./assets/images/softvenceLogo.png"),
      date: "Nov 2025 – Jun 2026",
      desc: "Dhaka, Bangladesh (On-site). Engineered high-performance RAG pipelines and multi-agent systems using GPT-4o, LangGraph, and CrewAI.",
      descBullets: [
        "Built multi-tenant AI Agent SaaS platform: 15 specialized agents integrated across 4 messaging channels",
        "Automated booking, support triage, and ticket deduplication across 5+ APIs using n8n workflows",
        "Developed BilledSmart: Automated OCR & RAG bill analysis eliminating 100% of manual bill review",
        "Created WhatsApp booking bot: Automated booking via text, audio, and image inputs with 0 manual intervention",
        "Integrated vector search (FAISS, Pinecone, pgvector), LangSmith monitoring, and multi-LLM routing (OpenAI, Gemini, Groq, Grok)"
      ]
    },
    {
      role: "Research Assistant",
      company: "Metropolitan University",
      companylogo: require("./assets/images/metropolitanLogo.png"),
      date: "Oct 2024 – May 2025",
      desc: "Sylhet, Bangladesh. Conducted academic research in Deep Learning and Medical Image Processing.",
      descBullets: [
        "Harmonized multi-source clinical datasets for heart disease diagnosis achieving 96.36% accuracy with 1D-CNN (published in CMC, Q2 journal)",
        "Engineered hybrid Swin Transformer + ResNet50 model (DSVTLA) for 5-type cancer classification reaching up to 99.23% accuracy (Elsevier Q1 journal)"
      ]
    }
  ]
};

// Open Source Section (GitHub Projects)
const openSource = {
  showGithubProfile: "true",
  display: false,
  githubUserName: "JamilKhanEmon" // আপনার গিটহাব ইউজারনেম
};

// Big Projects Section
const bigProjects = {
  title: "Big Projects",
  subtitle: "FLAGSHIP AI PRODUCTS AND SYSTEMS I HAVE ENGINEERED",
  projects: [
    {
      image: require("./assets/images/leadgenLogo.svg"),
      projectName: "LeadGen AI",
      projectDesc:
        "Autonomous B2B Lead Generation and Outreach Platform. Features OpenClaw headless crawler, 135-parameter lead scoring, automated email synthesis via Ollama/Gemini, Meta Graph API ads automation, and multilingual ElevenLabs voice booking agents."
    },
    {
      image: require("./assets/images/finsightLogo.svg"),
      projectName: "FinSight",
      projectDesc:
        "Enterprise Banking Intelligence & Analytics Platform. Custom Scikit-Learn pipelines, XGBoost credit underwriting (ROC-AUC: 0.938), extreme imbalance fraud defense (PR-AUC: 0.854), 12-page Streamlit portal, and low-latency FastAPI REST service."
    },
    {
      image: require("./assets/images/schoolErpLogo.svg"),
      projectName: "AI-Powered School ERP SaaS",
      projectDesc:
        "Multi-tenant school management ERP with tenant isolation, RBAC, fee/payroll automation, FastAPI GenAI question generation microservice, and real-time OpenCV CCTV exam proctoring for suspicious behavior detection."
    },
    {
      image: require("./assets/images/visionparkLogo.svg"),
      projectName: "VisionPark AI",
      projectDesc:
        "Smart AI Parking and Vehicle Surveillance System. Fine-tuned YOLO11x on 21 vehicle classes, 2-stage Bengali (BRTA) & English ANPR via EasyOCR, automated entry/exit slot tracking, and real-time Chart.js dashboard."
    }
  ],
  display: true
};

// Achievement & Publications Section
const achievementSection = {
  title: "Publications & Achievements",
  subtitle:
    "Scientific publications in top-tier international journals and research milestones",

  achievementsCards: [
    {
      title: "DSVTLA: Swin Vision Transformer Multi-Type Cancer Classification",
      subtitle:
        "Computers in Biology and Medicine (Q1, Elsevier, 2026). Hybrid Swin-Base + ResNet50 benchmarked across 58,885 images and 9 baselines with LIME/SHAP explainability, achieving up to 99.23% accuracy.",
      image: require("./assets/images/elsevierLogo.png"),
      imageAlt: "Elsevier Research Publication",
      footerLink: [
        {
          name: "arXiv Preprint",
          url: "https://arxiv.org/abs/2604.09468"
        }
      ]
    },
    {
      title: "Harmonization of Heart Disease Dataset for Accurate Diagnosis",
      subtitle:
        "CMC: Computers, Materials & Continua (Q2, SCI, Scopus, 2025). Novel multi-regional clinical data fusion, outlier handling, PCA and 1D-CNN architecture yielding 96.36% diagnosis accuracy.",
      image: require("./assets/images/cmcLogo.png"),
      imageAlt: "Tech Science Press Publication",
      footerLink: [
        {
          name: "Published Article",
          url: "https://www.techscience.com/cmc/online/detail/22560"
        }
      ]
    }
  ],
  display: true
};

// Blogs Section
const blogSection = {
  title: "Blogs",
  subtitle:
    "With love for developing cool AI systems, I love to write and share my knowledge.",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

// Talks Section
const talkSection = {
  title: "TALKS",
  subtitle:
    "I LOVE TO TALK ABOUT ARTIFICIAL INTELLIGENCE, AGENTS & FULL STACK DEVELOPMENT",
  talks: [],
  display: false
};

// Podcast Section
const podcastSection = {
  title: "Podcast",
  subtitle: "I LOVE TO TALK ABOUT TECH & INNOVATION",
  podcast: [],
  display: false
};

// Contact Info Section
const contactInfo = {
  title: "Contact Me",
  subtitle:
    "Discuss a project, AI agent pipeline, workflow automation, or just want to say hi? My inbox is open for all.",
  number: "+880 1760 413449",
  email_address: "jamilkhan.ju@gmail.com"
};

// Twitter Timeline Section
const twitterDetails = {
  userName: "twitter",
  display: false
};

const isHireable = true; // Open for new opportunities

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",
  link: "https://JamilKhanEmon.github.io/resume.pdf",
  display: false // Set to false to hide resume link in header
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
