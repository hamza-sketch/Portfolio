import { useState, useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiJira,
  SiJenkins,
  SiCplusplus,
} from "react-icons/si";

import { FaLinkedinIn, FaMoon, FaSun } from "react-icons/fa";
import { SiLeetcode, SiGmail } from "react-icons/si";

const WORK = [
  { name: "Google", role: "Software Engineer Intern", period: "May 2024 - Aug 2024", color: "#4285F4", initials: "G" },
  { name: "Razorpay", role: "Full Stack Intern", period: "Jan 2024 - Apr 2024", color: "#2EB88A", initials: "R" },
  { name: "StartupXYZ", role: "Backend Developer Intern", period: "Jun 2023 - Aug 2023", color: "#FF6B35", initials: "S" },
];

const EDUCATION = [
  { name: "Punjab university of information technology", degree: "BS Software Engineering", period: "2023 - 2027", color: "#003087", initials: "IIT" },
];

const SKILLS = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: FaNodeJs, color: "#68A063" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Github", icon: FaGithub, color: "#111111" },
  { name: "Jira", icon: SiJira, color: "#0052CC" },
  { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
];

const PROJECTS = [
  {
    title: "Academic Management",
    index: "01",
    desc: [
      "Engineered a system to manage students, teachers, courses, and enrollments",
      "Implemented advanced features including search, filtering, pagination, and relational data handling",
      "Designed scalable APIs and ensured consistency using optimized database schema",
    ],
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    accent: "#6366F1",
    preview: "https://res.cloudinary.com/diof7kckk/video/upload/q_auto/f_auto/v1782091253/Academic_Management_System_1_trfsa7.mp4",
    thumbnail: "https://res.cloudinary.com/diof7kckk/image/upload/q_auto/f_auto/v1782125486/thubmnail-1_icmnp8.png",

    links: {
      website: "https://your-live-site.com",
      source: "https://github.com/yourrepo",
    },
  },
  {
    title: "Inventory Management",
    index: "02",
    desc: [
      "Developed a full-stack inventory system using React.js, Node.js, Express.js, and MongoDB",
      "Implemented real-time stock tracking and CRUD operations with RESTful APIs",
      "Optimized backend logic to ensure data consistency and efficient database operations",
    ],
    tech: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    accent: "#22C55E",
    preview: "/videos/video-2.mp4",
    thumbnail: "https://res.cloudinary.com/diof7kckk/image/upload/q_auto/f_auto/v1782127030/thubmnail-2_miz7vx.png",
    links: {
      website: "https://shopstack.com",
      source: "https://github.com/yourrepo",
    },
  },
];

const HACKATHONS = [
  {
    name: "Smart India Hackathon",
    location: "New Delhi, India",
    date: "Dec 15th - 16th, 2023",
    desc: "Built an AI-powered grievance redressal system for government departments. Won 1st place among 500+ teams nationwide.",
    source: true,
    emoji: "🏆",
  },
  {
    name: "HackBout 3.0",
    location: "Mumbai, India",
    date: "Sep 8th - 10th, 2023",
    desc: "Created a real-time disaster relief coordination platform with geolocation mapping and SMS-based alerts.",
    source: true,
    emoji: "🌍",
  },
  {
    name: "ETHIndia 2023",
    location: "Bangalore, India",
    date: "Aug 11th - 13th, 2023",
    desc: "Developed a decentralized credential verification system on Ethereum. Great experience diving into web3.",
    source: false,
    emoji: "⛓",
  },
  {
    name: "Buildspace s4",
    location: "San Francisco, USA",
    date: "Jun 2023",
    desc: "Selected for the in-person cohort. Built and shipped a full AI SaaS product in 6 weeks alongside incredible builders.",
    source: false,
    emoji: "🚀",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionPill({ label }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <span style={{
        display: "inline-block",
        background: "#111827",
        color: "#fff",
        fontSize: 20,
        fontWeight: 600,
        padding: "10px 30px",
        borderRadius: 999,
        letterSpacing: "0.04em",
      }}>
        {label}
      </span>
    </div>
  );
}

function SkillBadge({ skill }) {
  const Icon = skill.icon;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      fontWeight: 600,
      color: "#374151",
      background: "#fff",
      border: "1px solid #E5E7EB",
      padding: "8px 14px",
      borderRadius: 999,
    }}>
      <Icon size={18} color={skill.color} />
      {skill.name}
    </span>
  );
}

function LogoCircle({ color, initials }) {
  return (
    <div style={{
      width: 42, height: 42, borderRadius: "50%",
      border: "1px solid #E5E7EB",
      background: color + "15",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{initials}</span>
    </div>
  );
}

function TimelineRow({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 0", borderBottom: "1px solid #F3F4F6",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LogoCircle color={item.color} initials={item.initials} />
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.name}</p>
            <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{item.role || item.degree}</p>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF", whiteSpace: "nowrap", paddingLeft: 12 }}>{item.period}</p>
      </div>
    </Reveal>
  );
}

function HackathonRow({ h, i, isLast }) {
  return (
    <Reveal delay={i * 0.07}>
      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 42 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            border: "1.5px solid #E5E7EB", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, zIndex: 1,
          }}>
            {h.emoji}
          </div>
          {!isLast && <div style={{ width: 1.5, flex: 1, background: "#E5E7EB", minHeight: 24, marginTop: 6 }} />}
        </div>
        <div style={{ paddingTop: 6, paddingBottom: isLast ? 0 : 28 }}>
          <p style={{ margin: "0 0 3px", fontSize: 12, color: "#9CA3AF" }}>{h.date}</p>
          <p style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 700, color: "#111827" }}>{h.name}</p>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6B7280" }}>{h.location}</p>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{h.desc}</p>
          {h.source && (
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#111827", color: "#fff",
              fontSize: 12, fontWeight: 600,
              padding: "5px 14px", borderRadius: 999,
              textDecoration: "none",
            }}>
              ⚙ Source
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

// ─── VIDEO MODAL ─────────────────────────────────────────────────────────────

function VideoModal({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(880px, 92vw)",
          background: "#000",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <video
          src={src}
          autoPlay
          controls
          style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain" }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none",
            cursor: "pointer", color: "#fff", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─── PROJECT CARD (new horizontal layout) ────────────────────────────────────

function ProjectCard({ p, delay = 0 }) {
  const [modal, setModal] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
         className="project-card"
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 18,
          overflow: "hidden",
          display: "grid",
          marginBottom: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            padding: window.innerWidth < 768 ? "1.3rem" : "2.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid #F3F4F6",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "#9CA3AF",
                marginBottom: 14,
              }}
            >
              {p.index} / 0{PROJECTS.length}
            </p>

            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 999,
                background: p.accent,
                marginBottom: 18,
              }}
            />

            <h3
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#111827",
                marginBottom: 16,
              }}
            >
              {p.title}
            </h3>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {p.desc.map((d, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.8,
                  }}
                >
                  <span style={{ color: "#D1D5DB" }}>—</span>
                  {d}
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: "1px solid #E5E7EB",
                    color: "#6B7280",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={p.links.website}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                background: "#111827",
                color: "#fff",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ↗ Live Demo
            </a>

            <a
              href={p.links.source}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                border: "1px solid #E5E7EB",
                color: "#374151",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div
          onClick={() => setModal(true)}
          style={{
            padding: 18,
            background: "#111827",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {/* Browser Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />

            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />

            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />

            <div
              style={{
                flex: 1,
                height: 26,
                borderRadius: 999,
                background: "#1F2937",
                marginLeft: 10,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                color: "#9CA3AF",
                fontSize: 11,
              }}
            >
              localhost:3000
            </div>
          </div>

          {/* Screenshot */}
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 420,
                objectFit: "contain",
                background: "#fff",
                borderRadius: 12,
                display: "block",
              }}
            />

            {/* Play Button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: window.innerWidth < 768 ? 54 : 72,
                  height: window.innerWidth < 768 ? 54 : 72,
                  fontSize: window.innerWidth < 768 ? 20 : 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              >
                ▶
              </div>
            </div>

            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 11,
                letterSpacing: "0.04em",
              }}
            >
              WATCH DEMO
            </span>
          </div>
        </div>
      </div>

      {modal && (
        <VideoModal
          src={p.preview}
          onClose={() => setModal(false)}
        />
      )}
    </Reveal>
  );
}

// ─── FLOATING DOCK ───────────────────────────────────────────────────────────

function FloatingDock({ darkMode, setDarkMode }) {
  const [hovered, setHovered] = useState(null);

  const ITEMS = [
    { label: "GitHub", icon: FaGithub, href: "https://github.com/hamza-sketch" },
    { label: "LeetCode", icon: SiLeetcode, href: "https://leetcode.com/u/Algo__Ninja/" },
    { label: "Gmail", icon: SiGmail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=bsef23a038@pucit.edu.pk" },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%",
      transform: "translateX(-50%)", zIndex: 999,
      display: "flex", gap: 10, flexWrap: "wrap", padding: "10px 14px",
      borderRadius: 999,
      background: "rgba(255,255,255,.85)",
      backdropFilter: "blur(16px)",
      border: "1px solid #E5E7EB",
      boxShadow: "0 8px 30px rgba(0,0,0,.08)",
    }}>
      {ITEMS.map((item, i) => {
        const Icon = item.icon;
        const active = hovered === i;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            title={item.label}
            style={{
              width: 48, height: 48, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#fff", color: "#111827",
              border: "1px solid #E5E7EB",
              transition: "all .22s ease",
              boxShadow: active ? "0 8px 18px rgba(0,0,0,.12)" : "none",
              textDecoration: "none",
            }}
          >
            <div style={{
              transform: active ? "scale(1.28)" : "scale(1)",
              transition: "transform .22s cubic-bezier(.34,1.56,.64,1)",
            }}>
              <Icon size={20} />
            </div>
          </a>
        );
      })}
      <div style={{ width: 1, background: "#E5E7EB", margin: "0 4px" }} />
      <button
        onClick={() => setDarkMode((d) => !d)}
        style={{
          width: 44, height: 44, borderRadius: "50%",
          border: "1px solid #E5E7EB", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </div>
  );
}

// ─── MAIN PORTFOLIO ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const bg = darkMode ? "#0B0B0F" : "#FFFFFF";
  const fg = darkMode ? "#F9FAFB" : "#111827";
  const muted = darkMode ? "#9CA3AF" : "#6B7280";

  const copyEmail = () => {
    navigator.clipboard.writeText("bsef23a038@pucit.edu.pk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: bg, color: fg,
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, sans-serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Dot grid bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.055)"} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "72px 24px 120px" }}>

        {/* ─── HERO ─── */}
        <section id="hero" style={{ marginBottom: 25 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ opacity: 0, animation: "popUp 0.6s ease 0.05s forwards" }}>
                <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.15, color: fg }}>
                  Hi, I'm <span>Hamza Zahid</span>
                </h1>
              </div>
              <div style={{ opacity: 0, animation: "popUp 0.6s ease 0.18s forwards" }}>
                <p style={{ fontSize: 15, color: muted, lineHeight: 1.8, margin: 0, maxWidth: 430 }}>
                  Full Stack Developer & CS student passionate about shipping products. I love building things from 0 to 1. Currently hunting for exciting opportunities.
                </p>
              </div>
            </div>
            <div style={{ opacity: 0, animation: "popUp 0.6s ease 0.1s forwards" }}>
              <img
                src="/images/headshort.png"
                alt="Hamza Zahid"
                style={{
                  width: 130, height: 130, borderRadius: "50%",
                  border: "2px solid #E5E7EB", objectFit: "cover",
                  flexShrink: 0, display: "block",
                }}
              />
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 14px", color: fg }}>About</h2>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.85, margin: 0 }}>
              <b>Software Engineer</b> with hands-on experience building scalable full-stack applications using React, Node.js, and MongoDB. Strong foundation in backend architecture, database design, and API development and to design real-world systems. Quick learner with strong <b>problem-solving skills</b>, actively exploring modern tools and best practices in software development and system design.
            </p>
          </Reveal>
        </section>

        {/* ─── EDUCATION ─── */}
        <section style={{ marginBottom: 56 }}>
          <Reveal>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px", color: fg }}>Education</h2>
          </Reveal>
          {EDUCATION.map((e, i) => <TimelineRow key={e.name} item={e} delay={i * 0.07} />)}
        </section>

        {/* ─── SKILLS ─── */}
        <section style={{ marginBottom: 80 }}>
          <Reveal>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 18px", color: fg }}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.04}>
                  <SkillBadge skill={s} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" style={{ marginBottom: 80 }}>
          {/* header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #D1D5DB)" }} />
            <span style={{
              display: "inline-block", background: "#111827", color: "#fff",
              fontSize: 14, fontWeight: 600, padding: "8px 22px",
              borderRadius: 999, letterSpacing: "0.04em", whiteSpace: "nowrap",
            }}>
              My Projects
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #D1D5DB)" }} />
          </div>

          <Reveal>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.1rem)", fontWeight: 800, textAlign: "center", margin: "0 0 10px", color: fg }}>
              Check out my latest work
            </h2>
            <p style={{ fontSize: 14, color: muted, textAlign: "center", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
              I've built a variety of projects from simple websites to complex web applications. Here are a few of my favorites.
            </p>
          </Reveal>

          {/* stacked full-width cards */}
          <div>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} p={p} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact">
          <SectionPill label="Contact" />
          <Reveal>
            <div style={{
              border: "1px solid #E5E7EB", borderRadius: 20,
              padding: "52px 32px", textAlign: "center",
              position: "relative", overflow: "hidden",
              backgroundImage: `radial-gradient(${darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
            }}>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 800, margin: "0 0 14px", color: fg }}>
                Get in Touch
              </h2>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.8, maxWidth: 380, margin: "0 auto 32px" }}>
                Want to chat? Shoot me a message on LinkedIn or drop an email. I respond to everyone. Will ignore soliciting though 😅
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={copyEmail}
                  style={{
                    background: "#111827", color: "#fff",
                    border: "none", padding: "12px 26px",
                    borderRadius: 10, fontSize: 14, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {copied ? "✓ Copied!" : "📧 Copy Email"}
                </button>
                <a
                  href="https://wa.me/923328797355"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "#288b4e", color: "#fff",
                    border: "none", padding: "12px 26px",
                    borderRadius: 10, fontSize: 14, fontWeight: 600,
                    textDecoration: "none", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <FloatingDock darkMode={darkMode} setDarkMode={setDarkMode} />

      <style>{`
        @keyframes popUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
              .project-card {
        grid-template-columns: 1fr 1.15fr;
      }

      @media (max-width: 768px) {
        .project-card {
          grid-template-columns: 1fr !important;
        }
}
      `}</style>
    </div>
  );
}