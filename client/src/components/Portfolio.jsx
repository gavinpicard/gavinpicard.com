import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Box, Database, BookOpen, Terminal,Server, Globe, Smartphone, Music, MapPin, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { RiJavaLine } from "react-icons/ri";
import { TbBrandMysql, TbBrandCSharp } from "react-icons/tb";
import { 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiJavascript, 
  SiTypescript,
  SiRaylib,
  SiFirebase,
  SiSwift,
  SiC,
  SiLua,
  SiApple,
  SiSupabase,
  SiPostgresql,
  SiExpress,
  SiRedis,
  SiProxmox,
  SiNginx,
  SiTailwindcss,
  SiDocker,
  SiAmazon,
  SiGit
} from 'react-icons/si';

function Portfolio() {
  const [showContacts, setShowContacts] = useState(false);

  const projects = [
    {
      title: "Personal Website (You're Here!)",
      description: "A full-stack blog application with markdown support, tag filtering, and admin authentication. Features a modern, responsive design with image uploads and dynamic content rendering.",
      technologies: [
        { name: "React", Icon: SiReact, color: "bg-green/20 border-green/30" },
        { name: "Node.js", Icon: SiNodedotjs, color: "bg-teal/20 border-teal/30" },
        { name: "Express", Icon: SiExpress, color: "bg-orange/20 border-orange/30" },
        { name: "MySQL", Icon: SiPostgresql, color: "bg-yellow/20 border-yellow/30" },
        { name: "Tailwind", Icon: SiTailwindcss, color: "bg-red/20 border-red/30" }
      ],
      category: "Web Development",
      icon: Globe,
      github: "https://github.com/gavinpicard",
      demo: null
    },
    {
      title: "VOLCRAFT Minecraft Network",
      description:
        "A multi-server Minecraft network for University of Tennessee students. Features a custom proxy architecture, Java plugins, MySQL/Redis databases, automated deployment pipelines, a real-time web map, donation system, Discord integration, and a scalable Proxmox-based hosting environment.",
      technologies: [
        { name: "Java", Icon: RiJavaLine, color: "bg-orange/20 border-orange/30" },
        { name: "Docker", Icon: SiDocker, color: "bg-blue/20 border-blue/30" },
        { name: "MySQL", Icon: TbBrandMysql, color: "bg-yellow/20 border-yellow/30" },
        { name: "Redis", Icon: SiRedis, color: "bg-red/20 border-red/30" },
        { name: "Proxmox", Icon: SiProxmox, color: "bg-orange/20 border-orange/30" },
        { name: "NGINX", Icon: SiNginx, color: "bg-green/20 border-green/30" },
      ],
      category: "Systems / Backend",
      icon: Server,
      github: null,
      demo: "https://volcraft.net"
    },
    {
      title: "Lexo – Gamified Reading Tracker",
      description:
        "A SwiftUI-based reading tracker that uses PostgreSQL and Supabase for real-time sync. Features custom animations, streak systems, achievements, an offline-first cache architecture, and future plans for social reading and book metadata fetching.",
      technologies: [
        { name: "Swift", Icon: SiSwift, color: "bg-orange/20 border-orange/30" },
        { name: "SwiftUI", Icon: SiApple, color: "bg-orange/20 border-orange/30" },
        { name: "Supabase", Icon: SiSupabase, color: "bg-green/20 border-green/30" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "bg-blue/20 border-blue/30" }
      ],
      category: "Mobile Development",
      icon: BookOpen,
      github: "https://github.com/gavinpicard",
      demo: null
    },
    {
      title: "Informatics – Terminal Dashboard",
      description:
        "A multi-pane ncurses-style terminal dashboard with tiling layouts, 24-bit color, real-time CPU/memory/network widgets, and a 3D ASCII Earth renderer. Fully scriptable via Lua and designed as a power-user monitoring tool.",
      technologies: [
        { name: "C", Icon: SiC, color: "bg-blue/20 border-blue/30" },
        { name: "Lua", Icon: SiLua, color: "bg-orange/20 border-orange/30" }
      ],
      category: "Systems Programming",
      icon: Terminal,
      github: "https://github.com/gavinpicard",
      demo: null,
      image: "/informatics.png"
    },
    {
      title: "Albumi – Album Review Platform",
      description:
        "A React + Firebase social platform for reviewing and discussing music albums. Includes custom lists, favorites, social feeds, Spotify API integration, a search system, and dynamic album detail views.",
      technologies: [
        { name: "React", Icon: SiReact, color: "bg-blue/20 border-blue/30" },
        { name: "Firebase", Icon: SiFirebase, color: "bg-yellow/20 border-yellow/30" },
        { name: "Tailwind", Icon: SiTailwindcss, color: "bg-teal/20 border-teal/30" }
      ],
      category: "Web Development",
      icon: Music,
      github: "https://github.com/gavinpicard",
      demo: null
    },
    {
      title: "Voxel Engine",
      description:
        "A Minecraft-inspired voxel engine with moddable Lua scripting, chunk streaming, Raylib rendering, custom block definitions, and experiments with colored voxel lighting and sun-directional shadows.",
      technologies: [
        { name: "C#", Icon: TbBrandCSharp, color: "bg-yellow/20 border-yellow/30" },
        { name: "Raylib", Icon: SiRaylib, color: "bg-red/20 border-red/30" },
        { name: "Lua", Icon: SiLua, color: "bg-teal/20 border-teal/30" }
      ],
      category: "Game Development",
      icon: Box,
      github: "https://github.com/gavinpicard",
      demo: null,
      image: "/voxel-game.png"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-start gap-2 sm:gap-8 p-4 sm:p-8 min-h-screen w-[90%] max-w-5xl mx-auto lg:items-start pt-32 md:pt-40 relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      ></div>
      {/* Profile Sidebar */}
      <div className="lg:sticky lg:top-32 self-start w-full lg:w-64 bg-background-secondary rounded-2xl sm:rounded-3xl p-4 sm:p-4 lg:p-4 border border-background-tertiary lg:mb-0 mb-8 shadow-[0_4px_16px_rgba(0,0,0,0.2)] relative z-10">
        {/* Mobile Layout: Image and Name on Left */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4 w-full">
            {/* Profile Image Section */}
            <div className="flex-shrink-0">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                src="/IMG_6766.JPG"
                alt="Gavin Picard"
              />
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl m-0 text-custom-white text-left font-bold truncate">
                Gavin Picard
              </h2>
            </div>

            {/* Expand Contacts Button - Unlabeled, Mobile Only */}
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="flex-shrink-0 p-2 bg-background-tertiary rounded-lg text-teal hover:bg-teal hover:text-custom-white transition-all duration-200 border border-teal/30 hover:border-teal relative z-20"
              aria-label={showContacts ? "Hide contacts" : "Show contacts"}
            >
              {showContacts ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Contact Info - Collapsible, shown below when expanded */}
          {showContacts && (
            <>
              <div className="border-t border-background-tertiary pt-4"></div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-left">
                  <Mail className="w-4 h-4 text-teal flex-shrink-0" />
                  <a
                    href="mailto:gavinlpicard@gmail.com"
                    className="text-sm text-custom-gray hover:text-teal transition-colors duration-200 no-underline"
                  >
                    gavinlpicard@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <MapPin className="w-4 h-4 text-teal flex-shrink-0" />
                  <span className="text-sm text-custom-gray">
                    Knoxville, TN
                  </span>
                </div>
              </div>
              <div className="border-t border-background-tertiary pt-4"></div>
              {/* Social Icons - Mobile */}
              <div className="flex flex-row gap-3 justify-start">
                <a
                  href="https://github.com/gavinpicard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-custom-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gavinpicard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-custom-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Desktop Layout: Vertical Centered */}
        <div className="hidden lg:flex flex-col items-center w-full">
          {/* Profile Image Section - Explicit padding to match container */}
          <img
            className="w-64 h-56 rounded-2xl object-cover shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            src="/IMG_6766.JPG"
            alt="Gavin Picard"
          />

          {/* Profile Info Section */}
          <div className="flex flex-col items-center w-full gap-6 mt-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl lg:text-2xl m-0 mb-2 text-custom-white font-bold">
                Gavin Picard
              </h2>
              <p className="text-sm sm:text-base text-custom-gray">
                Computer Science Student
              </p>
            </div>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download="Gavin_Picard_Resume.pdf"
              className="flex items-center justify-center gap-2 py-2.5 px-6 bg-background-tertiary rounded-lg text-teal no-underline transition-all duration-200 hover:bg-teal hover:text-custom-white text-sm sm:text-base border border-teal/30 hover:border-teal w-full"
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>

            {/* Divider */}
            <div className="w-full border-t border-background-tertiary"></div>

            {/* Contact Info - Always visible on desktop */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 text-left">
                <Mail className="w-4 h-4 text-teal flex-shrink-0" />
                <a
                  href="mailto:gavinlpicard@gmail.com"
                  className="text-sm text-custom-gray hover:text-teal transition-colors duration-200 no-underline"
                >
                  gavinlpicard@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-left">
                <MapPin className="w-4 h-4 text-teal flex-shrink-0" />
                <span className="text-sm text-custom-gray">Knoxville, TN</span>
              </div>
            </div>

            {/* Divider */}

            <div className="w-full border-t border-background-tertiary"></div>

            {/* Social Icons */}
            <div className="flex flex-row gap-3 w-full justify-center">
              <a
                href="https://github.com/gavinpicard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-custom-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/gavinpicard/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-custom-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>



      {/* Projects Section */}
      <div className="flex-1 w-full relative z-10">
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="group bg-background-secondary rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-background-tertiary hover:border-teal/50 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
              >
                <div className="flex flex-col gap-4 sm:gap-6">
                  {/* Header with title, icon, and action buttons */}
                  <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-custom-white m-0 mb-2 text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {project.title}
                      </h3>
                      <div className="text-left">
                        <span className="inline-block text-xs px-4 py-1.5 bg-teal/20 text-teal rounded-full border border-teal/30 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    {/* Action buttons on the right */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-background-tertiary rounded-lg text-custom-gray hover:text-teal hover:bg-background-tertiary/80 transition-all duration-200 border border-background-tertiary hover:border-teal/50 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(95,135,95,0.3)]"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-background-tertiary rounded-lg text-custom-gray hover:text-teal hover:bg-background-tertiary/80 transition-all duration-200 border border-background-tertiary hover:border-teal/50 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(95,135,95,0.3)]"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Image */}
                  {project.image && (
                    <div className="w-full rounded-lg overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div className="text-left">
                    <p className="text-sm sm:text-base text-custom-gray leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const TechIcon = tech.Icon;
                        return (
                          <div
                            key={techIndex}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${tech.color} transition-all duration-200 hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.2)]`}
                          >
                            <TechIcon className="w-4 h-4 text-custom-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]" />
                            <span className="text-xs sm:text-sm text-custom-white font-medium">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;

