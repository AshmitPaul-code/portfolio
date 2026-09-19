import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { skillGroups } from "../../data/portfolioData";

function SwarmIcon({ skill, mouseX, mouseY, isHovering, isDocked, isHidden, isMobile }) {
  // 1. Cursor/free-float spring: retains 100% untouched original physics (stiffness: 100, damping: 15 + index * 6)
  //    so cursor-following speed, duration, lag, and responsiveness remain completely identical.
  const cursorX = useMotionValue(skill.homeX);
  const cursorY = useMotionValue(skill.homeY);
  const cursorSpringX = useSpring(cursorX, { stiffness: skill.stiffness, damping: skill.damping });
  const cursorSpringY = useSpring(cursorY, { stiffness: skill.stiffness, damping: skill.damping });

  // 2. Dedicated docking spring: fast & smooth settling specifically for the Skills section entrance
  const dockX = useMotionValue(skill.homeX);
  const dockY = useMotionValue(skill.homeY);
  const dockSpringX = useSpring(dockX, { stiffness: isMobile ? 320 : 260, damping: isMobile ? 28 : 26 });
  const dockSpringY = useSpring(dockY, { stiffness: isMobile ? 320 : 260, damping: isMobile ? 28 : 26 });

  // Track previous isDocked state for seamless handoff between the two springs
  const prevDockedRef = useRef(isDocked);

  useEffect(() => {
    let animationFrame;
    const updatePosition = () => {
      // Seamless position handoff when entering or leaving the Skills dock
      if (isDocked !== prevDockedRef.current) {
        if (isDocked) {
          const currentX = cursorSpringX.get();
          const currentY = cursorSpringY.get();
          dockX.jump(currentX);
          dockY.jump(currentY);
        } else {
          const currentX = dockSpringX.get();
          const currentY = dockSpringY.get();
          cursorX.jump(currentX);
          cursorY.jump(currentY);
        }
        prevDockedRef.current = isDocked;
      }

      if (isHidden) {
        // Fall down off screen!
        const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const h = typeof window !== 'undefined' ? window.innerHeight : 800;
        cursorX.set(w * 0.1 + Math.random() * (w * 0.8));
        cursorY.set(h + 200 + Math.random() * 500);
      } else if (isDocked) {
        // Dock exactly to the center of the placeholder div in Skills.jsx
        const targetEl = document.getElementById(`skill-tag-${skill.name}`);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const sz = isMobile ? 36 : skill.size;
          const targetX = rect.left + rect.width / 2 - sz / 2;
          const targetY = rect.top + rect.height / 2 - sz / 2;
          dockX.set(targetX);
          dockY.set(targetY);
        } else {
          dockX.set(skill.homeX);
          dockY.set(skill.homeY);
        }
      } else if (isHovering) {
        cursorX.set(mouseX.get() + skill.clusterX);
        cursorY.set(mouseY.get() + skill.clusterY);
      } else {
        cursorX.set(skill.homeX);
        cursorY.set(skill.homeY);
      }

      animationFrame = requestAnimationFrame(updatePosition);
    };
    updatePosition();
    return () => cancelAnimationFrame(animationFrame);
  }, [mouseX, mouseY, isHovering, isDocked, isHidden, skill, isMobile, cursorX, cursorY, dockX, dockY, cursorSpringX, cursorSpringY, dockSpringX, dockSpringY]);

  const springX = isDocked ? dockSpringX : cursorSpringX;
  const springY = isDocked ? dockSpringY : cursorSpringY;

  const sz = isMobile ? 36 : skill.size;

  return (
    <motion.div
      layoutId={`swarm-${skill.name}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        width: sz,
        height: sz,
        pointerEvents: "none",
        zIndex: 10
      }}
      animate={{
        rotate: isDocked ? 0 : [0, 10, -10, 0],
        opacity: isDocked ? 0.95 : (isHovering ? 0.6 : 0.2)
      }}
      transition={
        isDocked
          ? { type: "spring", stiffness: isMobile ? 320 : 260, damping: isMobile ? 28 : 26, opacity: { duration: 0.2 }, layout: { type: "tween", duration: 0 } }
          : {
            layout: { type: "tween", duration: 0 },
            rotate: { duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }
      }
    >
      <img
        src={skill.icon}
        alt={skill.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "20%"
        }}
      />
    </motion.div>
  );
}

export default function FloatingSkills({ isDocked, isHidden }) {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 800);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const skills = useMemo(() => {
    const allSkills = skillGroups.flatMap((group) => group.items);
    return allSkills.map((skill, index) => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      return {
        ...skill,
        size: 45,
        homeX: w * (0.05 + Math.random() * 0.9),
        homeY: h * (0.05 + Math.random() * 0.9),
        clusterX: (Math.random() - 0.5) * 140,
        clusterY: (Math.random() - 0.5) * 140,
        stiffness: 100,
        damping: 15 + index * 6,
      };
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);

      setIsHovering(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsHovering(false);
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, [mouseX, mouseY]);

  // If hidden, we unmount them so Playground can take over their layoutIds!
  if (isHidden) return null;

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}>
      {skills.map((s, i) => (
        <SwarmIcon key={i} skill={s} mouseX={mouseX} mouseY={mouseY} isHovering={isHovering} isDocked={isDocked} isMobile={isMobile} />
      ))}
    </div>
  );
}
