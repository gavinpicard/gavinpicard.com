import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative z-30 mt-8">
      {/* Solid background that extends above to cover rounded corners - matches gradient */}
      <div className="absolute left-0 right-0 bottom-0" style={{
        background: 'linear-gradient(to bottom, #1a1a1a 0%, #171717 50%, #141414 100%)',
        backgroundAttachment: 'fixed'
      }}></div>
      {/* Footer content with rounded top corners */}
      <div className="relative bg-dark-gray rounded-t-3xl sm:rounded-t-[4rem] shadow-xl">
          <div className="w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Navigation */}
          <div>
            <h3 className="text-left text-base sm:text-lg font-bold text-custom-white mb-3 sm:mb-4">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200">
                Home
              </Link>
              <Link to="/glog" className="text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200">
                Glog
              </Link>
              <Link to="/portfolio" className="text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200">
                Portfolio
              </Link>
              <Link to="/resume" className="text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200">
                Resume
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-left text-base sm:text-lg font-bold text-custom-white mb-3 sm:mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/gavinpicard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/gavinpicard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-left text-sm sm:text-base text-custom-gray hover:text-teal transition-colors duration-200"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-custom-white mb-3 sm:mb-4 text-left">
              About
            </h3>
            <p className="text-left text-xs sm:text-sm text-custom-gray leading-relaxed">
              Personal website and blog by Gavin Picard. Sharing thoughts, projects, and music.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background-tertiary pt-6 sm:pt-8">
          <p className="text-custom-gray text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} Gavin Picard. All rights reserved.
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

