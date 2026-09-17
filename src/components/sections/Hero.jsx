import React, { useRef, useState, useEffect } from "react";
import { useMotionValue, useSpring, motion, AnimatePresence } from "framer-motion";
import DocLayer from "../ui/DocLayer";
import { c, mono, serif } from "../../data/theme";

const WORDS = [
  "Tech-driven",
  "AI-powered",
  "Problem-solving",
  "Scalable",
];

export default function Hero() {
  const heroRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 15 });
  const smy = useSpring(my, { stiffness: 60, damping: 15 });
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize();
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (reduced) return;
    const rect = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "90px 16px 50px" : "100px 32px 60px", overflow: "hidden" }}
    >
      {/* Desktop Background Project Visuals - 100% Unchanged */}
      {!isMobile && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 1080, height: "100%" }}>
            <DocLayer mx={smx} my={smy} depth={22} rotate={-6} imageSrc="./project_images/restaurant.png" box={{ width: 260, height: 170, top: "14%", right: "0%" }} />
            <DocLayer mx={smx} my={smy} depth={14} rotate={4} imageSrc="./project_images/rock_paper_scissors.png" box={{ width: 240, height: 150, top: "25%", right: "10%" }} />
            <DocLayer mx={smx} my={smy} depth={30} rotate={9} imageSrc="./project_images/blood_donation.png" box={{ width: 220, height: 140, top: "34%", right: "-8%", opacity: 0.85 }} />
          </div>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: isMobile ? "32px" : "40px", alignItems: "center" }} className="kk-grid-collapse">
          <div>
            <div style={{ ...mono, display: "flex", alignItems: "center", gap: isMobile ? 8 : 10, fontSize: isMobile ? 10 : 12, letterSpacing: isMobile ? 1 : 2, textTransform: "uppercase", color: c.clay, marginBottom: isMobile ? 18 : 26 }}>
              <span style={{ width: isMobile ? 18 : 26, height: 1, background: c.clay, flexShrink: 0 }} />
              <span>BCA Student & Aspiring Software Developer</span>
            </div>

            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: isMobile ? 1.12 : 1.05, fontSize: "clamp(28px, 5vw, 62px)", maxWidth: 750, color: c.ink }}>
              Ashmit Paul<br />
              <span style={{ whiteSpace: "nowrap" }}>
                Building,{" "}
                <span style={{ display: "inline-block", width: isMobile ? "7.5em" : "8.5em", position: "relative", verticalAlign: "bottom" }}>
                  <AnimatePresence>
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "absolute", left: 0, bottom: 0, whiteSpace: "nowrap" }}
                    >
                      <em style={{ fontStyle: "italic", fontWeight: 500, color: c.mossDeep }}>{WORDS[wordIndex]}</em>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>{" "}
              systems.
            </h1>

            <p style={{ marginTop: isMobile ? 18 : 26, fontSize: isMobile ? 16 : 18, color: c.inkSoft, maxWidth: 560, lineHeight: 1.6 }}>
              I’m a BCA student passionate about software development, web technologies, and building practical projects. I’m continuously learning and improving my skills to become a skilled software developer.
            </p>

            <div style={{ marginTop: isMobile ? 24 : 32 }}>
              <a
                href="./Ashmit_Paul_Resume.pdf"
                download="Ashmit_Paul_Resume.pdf"
                style={{
                  ...mono,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  background: c.mossDeep,
                  border: `1px solid ${c.mossDeep}`,
                  color: c.paper,
                  borderRadius: 8,
                  boxShadow: "0 4px 14px rgba(60, 68, 50, 0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.ink;
                  e.currentTarget.style.borderColor = c.ink;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(42, 39, 30, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = c.mossDeep;
                  e.currentTarget.style.borderColor = c.mossDeep;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(60, 68, 50, 0.2)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>

            <div style={{
              marginTop: isMobile ? 24 : 40,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: isMobile ? 8 : 24,
              paddingTop: 16
            }}>
              {[["3rd", "Semester"], ["9.0", "CGPA"], ["3", "Projects"]].map(([num, label]) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.4)",
                  border: `1px solid ${c.line}`,
                  padding: isMobile ? "12px 6px" : "20px 24px",
                  borderRadius: isMobile ? 12 : 16,
                  backdropFilter: "blur(10px)",
                  textAlign: isMobile ? "center" : "left",
                  minWidth: 0
                }}>
                  <div style={{ ...serif, fontStyle: "italic", fontSize: isMobile ? 22 : 32, color: c.mossDeep, marginBottom: 4 }}>{num}</div>
                  <div style={{ ...mono, fontSize: isMobile ? 9 : 11, letterSpacing: isMobile ? 0.5 : 1, textTransform: "uppercase", color: c.inkSoft, lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none", marginTop: isMobile ? 20 : -45, width: "100%" }}>
            {/* Mobile Project Visuals: Anchored around portrait container */}
            {isMobile && (
              <div style={{ position: "absolute", inset: 0, width: "100%", maxWidth: 350, margin: "0 auto", height: "100%", pointerEvents: "none" }}>
                <DocLayer mx={smx} my={smy} depth={15} rotate={7} imageSrc="./project_images/restaurant.png" box={{ width: 132, height: 88, top: -14, right: 4, zIndex: 1 }} />
                <DocLayer mx={smx} my={smy} depth={10} rotate={-7} imageSrc="./project_images/rock_paper_scissors.png" box={{ width: 126, height: 84, top: 12, left: 4, zIndex: 1 }} />
                <DocLayer mx={smx} my={smy} depth={18} rotate={5} imageSrc="./project_images/blood_donation.png" box={{ width: 120, height: 78, top: 90, right: -4, zIndex: 1, opacity: 0.9 }} />
              </div>
            )}

            <img
              src="./ashmit.png"
              alt="Ashmit Paul"
              draggable="false"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: isMobile ? 320 : 415,
                borderRadius: 24,
                userSelect: "none",
                pointerEvents: "none",
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
