import React, { useState } from "react";
import SectionHead from "../ui/SectionHead";
import Reveal from "../ui/Reveal";
import { c, mono, serif } from "../../data/theme";
import { Mail, Copy, Check } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("ashmitpaul369@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: "100px 0", background: c.bgDeep, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}  >
        <SectionHead index="06" title="Let's" em="talk" />
        <Reveal style={{ marginTop: 24 }}>
          <p style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 5vw, 60px)", maxWidth: 700, lineHeight: 1.1, color: c.ink }}>
            Building something with web technologies, software, or practical projects? I'd like to hear about it.
          </p>
          <p style={{ color: c.inkSoft, fontSize: 16, marginTop: 20, maxWidth: 520, lineHeight: 1.7 }}>
            Currently open to internships, software development opportunities, and engineering collaborations.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 40 }}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ashmitpaul369@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="kk-btn-moss"
              style={{
                ...mono,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                padding: "14px 24px",
                background: c.mossDeep,
                border: `1px solid ${c.mossDeep}`,
                color: c.paper,
                borderRadius: 6,
                transition: "all 0.2s"
              }}
            >
              <Mail size={14} /> Email me
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="kk-btn-dark"
              style={{
                ...mono,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                padding: "14px 24px",
                border: `1px solid ${c.ink}`,
                color: c.ink,
                background: "transparent",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Email"}
            </button>
            <a href="https://github.com/AshmitPaul-code" target="_blank" rel="noopener noreferrer" className="kk-btn-dark" style={{ ...mono, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, padding: "14px 24px", border: `1px solid ${c.ink}`, color: c.ink, borderRadius: 6, transition: "all 0.2s" }}>
              <Github size={14} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/ashmit-paul-5aa39437a" target="_blank" rel="noopener noreferrer" className="kk-btn-dark" style={{ ...mono, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, padding: "14px 24px", border: `1px solid ${c.ink}`, color: c.ink, borderRadius: 6, transition: "all 0.2s" }}>
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
