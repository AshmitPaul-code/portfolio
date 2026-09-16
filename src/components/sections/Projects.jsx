import React from "react";
import SectionHead from "../ui/SectionHead";
import Cards from "@/blocks/interface-crafts-cards";
import { c, mono } from "../../data/theme";

export default function Projects() {
  return (
    <section id="work" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
        <SectionHead index="03" title="Selected" em="work" />

        <p style={{ ...mono, fontSize: 13, color: c.clay, textAlign: "center", marginBottom: 50, textTransform: "uppercase", letterSpacing: 1.5 }}>
          Click on any card to slide open technical details
        </p>

        <div className="mt-8 sm:mt-12 lg:mt-16">
          <Cards />
        </div>
      </div>
    </section>
  );
}
