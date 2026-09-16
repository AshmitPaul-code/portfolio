"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects } from "@/data/portfolioData";
import { mono, serif } from "@/data/theme";

const defaultSpring = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.25,
};

const cardConfigs = [
  {
    y: -20,
    rotate: -15,
    zIndex: 2,
    className: "bg-[#A4592F] text-white [&_h2]:text-white [&_p]:text-white/80", // Clay
  },
  {
    y: 20,
    rotate: 8,
    zIndex: 3,
    className: "bg-[#FAF7F0] text-[#2A271E] [&_h2]:text-[#2A271E] [&_p]:text-[#5B5643] border border-[rgba(42,39,30,0.12)]", // Paper/Parchment
  },
  {
    y: -60,
    rotate: -5,
    zIndex: 4,
    className: "bg-[#566047] text-white [&_h2]:text-white [&_p]:text-white/80", // Moss
  },
  {
    y: 20,
    rotate: 12,
    zIndex: 5,
    className: "bg-[#A98436] text-white [&_h2]:text-white [&_p]:text-white/80", // Gold
  },
  {
    y: 20,
    rotate: -5,
    zIndex: 6,
    className: "bg-[#2A271E] text-white [&_h2]:text-white [&_p]:text-white/80", // Ink
  },
];

export const controls = {
  spring: defaultSpring,
  activeScale: [1.15, 1, 1.6, 0.01],
  cardSpacing: [180, 40, 320, 5],
};

export const Cards = ({
  spring = defaultSpring,
  activeScale = 1.15,
  cardSpacing = 180,
} = {}) => {
  const cards = projects.map((project, index) => {
    const config = cardConfigs[index % cardConfigs.length];
    return {
      title: project.title,
      description: project.desc,
      image: project.image,
      github: project.github,
      live: project.live,
      tags: project.tags,
      className: config.className,
      config: {
        y: config.y,
        rotate: config.rotate,
        zIndex: index + 2,
      },
    };
  });

  const [active, setActive] = useState(null);
  const [spacing, setSpacing] = useState(cardSpacing);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setSpacing(Math.round(cardSpacing * 0.78));
      } else if (w >= 600) {
        setSpacing(Math.round(cardSpacing * 0.55));
      } else {
        setSpacing(Math.round(cardSpacing * 0.28));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardSpacing]);

  const middle = (cards.length - 1) / 2;

  const isAnyCardActive = () => {
    return active?.title;
  };

  const isCurrentActive = (card) => {
    return active?.title === card.title;
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center pt-6 sm:pt-10 pb-4" style={{ minHeight: "440px" }}>
      <motion.div
        ref={ref}
        onClick={() => setActive(null)}
        className="relative mx-auto flex h-104 sm:h-112 w-full max-w-6xl items-center justify-center [--height:310px] [--width:200px] sm:[--height:360px] sm:[--width:240px] lg:[--height:410px] lg:[--width:300px]"
      >
        {cards.map((card, index) => {
          const cardsCount = cards.length;
          const finalSpacing = cardsCount > 5 ? (spacing * 4) / (cardsCount - 1) : spacing;
          const offsetX = (index - middle) * finalSpacing;
          const isLightCard = card.className.includes("bg-[#FAF7F0]");
          const btnTextColor = isLightCard ? "#2A271E" : "#FAF7F0";
          const btnBgColor = isLightCard ? "rgba(42, 39, 30, 0.08)" : "rgba(255, 255, 255, 0.18)";
          const btnBorder = isLightCard ? "1px solid rgba(42, 39, 30, 0.15)" : "1px solid rgba(255, 255, 255, 0.2)";

          return (
            <motion.div key={card.title}>
              <motion.div
                initial={{
                  x: 0,
                  scale: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(card);
                }}
                animate={{
                  y: isCurrentActive(card)
                    ? 0
                    : isAnyCardActive()
                      ? card.config.y * 0.35
                      : card.config.y,
                  x: isCurrentActive(card)
                    ? "-40%"
                    : isAnyCardActive()
                      ? `calc(var(--width) * 0.96 + ${offsetX * 0.35}px)`
                      : offsetX,
                  rotate: isCurrentActive(card)
                    ? 0
                    : isAnyCardActive()
                      ? 0.15 * card.config.rotate
                      : card.config.rotate,
                  scale: isCurrentActive(card)
                    ? activeScale
                    : isAnyCardActive()
                      ? 0.65
                      : 1,
                }}
                whileHover={{
                  scale: isCurrentActive(card)
                    ? activeScale
                    : isAnyCardActive()
                      ? 0.65
                      : 1.04,
                }}
                transition={spring}
                style={{
                  width: `var(--width)`,
                  height: `var(--height)`,
                  marginLeft: `calc(var(--width) / -2)`,
                  marginTop: `calc(var(--height) / -2)`,
                  zIndex: isCurrentActive(card) ? 50 : card.config.zIndex,
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-start overflow-hidden rounded-2xl p-3 sm:p-4 shadow-xl transition-shadow duration-300 gap-2 sm:gap-2.5",
                  card.className
                )}
              >
                {/* Project Image Header */}
                <div className="h-24 sm:h-30 lg:h-34 w-full rounded-xl overflow-hidden bg-neutral-900/10 relative border border-black/5 flex-shrink-0">
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                </div>

                {/* Project Content */}
                <div className="w-full flex flex-col">
                  <h2
                    style={{ ...serif }}
                    className="font-bold text-left text-base sm:text-lg md:text-xl leading-snug py-0.5"
                  >
                    {card.title}
                  </h2>

                  <AnimatePresence mode="popLayout">
                    {active?.title === card.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={spring}
                        className="mt-1.5 w-full"
                      >
                        {/* Project Tech Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {card.tags?.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                borderColor: isLightCard ? "rgba(42,39,30,0.15)" : "rgba(255,255,255,0.2)",
                                background: isLightCard ? "rgba(42,39,30,0.04)" : "rgba(255,255,255,0.08)",
                                color: btnTextColor,
                                fontSize: "9px",
                                ...mono,
                              }}
                              className="px-1.5 py-0.5 rounded border text-[9px] uppercase tracking-wider font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Project Description */}
                        <p
                          style={{ ...mono }}
                          className="text-left text-[11px] opacity-90 line-clamp-2 leading-relaxed mb-2.5"
                        >
                          {card.description}
                        </p>

                        {/* Action Links */}
                        <div className="flex gap-2 pt-0.5">
                          {card.github ? (
                            <a
                              href={card.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                color: btnTextColor,
                                background: btnBgColor,
                                border: btnBorder,
                                ...mono,
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition-colors duration-250 hover:opacity-80"
                            >
                              Source
                            </a>
                          ) : (
                            <span
                              style={{
                                color: btnTextColor,
                                background: btnBgColor,
                                border: btnBorder,
                                opacity: 0.5,
                                cursor: "not-allowed",
                                pointerEvents: "none",
                                ...mono,
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase"
                            >
                              Private
                            </span>
                          )}
                          {card.live ? (
                            <a
                              href={card.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                color: btnTextColor,
                                background: btnBgColor,
                                border: btnBorder,
                                ...mono,
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition-colors duration-250 hover:opacity-80"
                            >
                              Launch →
                            </a>
                          ) : (
                            <span
                              style={{
                                color: btnTextColor,
                                background: btnBgColor,
                                border: btnBorder,
                                opacity: 0.5,
                                cursor: "not-allowed",
                                pointerEvents: "none",
                                ...mono,
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase"
                            >
                              Development
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Cards;
