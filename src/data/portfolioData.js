

export const projects = [
  {
    featured: true,
    index: "00",
    tag: "FEATURED JAVASCRIPT GAME",
    badge: "Interactive",
    title: "Rock Paper Scissors Game",
    desc: "An interactive browser-based game built with JavaScript and dynamic DOM manipulation. Features user choice interaction, real-time score tracking, and smooth responsive gameplay.",
    extra: "Engineered responsive UI, event listeners, dynamic state evaluation, and published live on GitHub Pages.",
    tags: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation", "GitHub Pages"],
    github: "https://github.com/AshmitPaul-code/rock-paper-scissors-",
    live: "https://ashmitpaul-code.github.io/rock-paper-scissors-/",
    image: "./project_images/rock_paper_scissors.png",
    stats: [
      { value: "100%", label: "Interactive" },
      { value: "0ms", label: "Delay" },
      { value: "DOM", label: "State Sync" }
    ]
  },
  {
    featured: false,
    index: "01",
    badge: "Frontend UI",
    title: "Responsive Restaurant Landing Page",
    desc: "A modern restaurant landing page featuring structured menus, clean visual hierarchy, and full mobile optimization across diverse screen resolutions.",
    role: "Designed structured layout sections, implemented modern CSS styling, and ensured cross-device responsiveness.",
    tags: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "GitHub Pages"],
    github: "https://github.com/AshmitPaul-code/restaurant-website",
    live: "https://ashmitpaul-code.github.io/restaurant-website/",
    image: "./project_images/restaurant.png",
    stats: [
      { value: "100%", label: "Responsive" },
      { value: "Modern", label: "UI / UX" },
      { value: "Clean", label: "Structure" }
    ]
  },
  {
    featured: false,
    index: "02",
    badge: "Community & Health",
    title: "Blood Donation Website",
    desc: "A responsive website focused on presenting essential blood donation information clearly, with accessible donor sections and community awareness resources.",
    role: "Structured visual components and informative sections for intuitive navigation and high accessibility.",
    tags: ["HTML5", "CSS3", "Web Accessibility", "UI Design", "GitHub Pages"],
    github: "https://github.com/AshmitPaul-code/blood-donation-website",
    live: "https://ashmitpaul-code.github.io/blood-donation-website/",
    image: "./project_images/blood_donation.png",
    stats: [
      { value: "Accessible", label: "UX" },
      { value: "Structured", label: "Information" },
      { value: "Community", label: "Impact" }
    ]
  }
];

export const skillGroups = [
  {
    label: "Languages",
    items: [
      { name: "Java", icon: "./icons/Java-Light.svg" },
      { name: "JavaScript", icon: "./icons/JavaScript.svg" },
      { name: "Python", icon: "./icons/Python-Light.svg" },
      { name: "C", icon: "./icons/C.svg" },
      { name: "C++", icon: "./icons/CPP.svg" },
      { name: "TypeScript", icon: "./icons/TypeScript.svg" },
      { name: "HTML5", icon: "./icons/HTML.svg" },
    ]
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "./icons/React-Light.svg" },
      { name: "Next.js", icon: "./icons/NextJS-Light.svg" },
      { name: "Tailwind CSS", icon: "./icons/TailwindCSS-Light.svg" },
      { name: "Figma", icon: "./icons/Figma-Light.svg" },
      { name: "CSS", icon: "./icons/CSS.svg" },
    ]
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "./icons/NodeJS-Light.svg" },
      { name: "Express.js", icon: "./icons/ExpressJS-Light.svg" },
      { name: "Flask", icon: "./icons/Flask-Light.svg" },
    ]
  },
  {
    label: "Database & Cloud",
    items: [
      { name: "MongoDB", icon: "./icons/MongoDB.svg" },
      { name: "Supabase", icon: "./icons/Supabase-Light.svg" },
      { name: "MySQL", icon: "./icons/MySQL-Light.svg" },
    ]
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "./icons/Docker.svg" },
      { name: "Git", icon: "./icons/Git.svg" },
      { name: "Github", icon: "./icons/Github-Light.svg" },
      { name: "Linux", icon: "./icons/Linux-Light.svg" },
      { name: "VS Code", icon: "./icons/VSCode-Light.svg" },
    ]
  },
  {
    label: "AI & Core",
    items: [
      { name: "ChatGPT", icon: "./icons/Chatgpt-Light.svg" },
      { name: "Claude", icon: "./icons/Claude-Light.svg" },
      { name: "Gemini", icon: "./icons/Gemini-Light.svg" }
    ]
  }
];
