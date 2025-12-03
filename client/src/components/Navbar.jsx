import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Menu, X, Download } from 'lucide-react';

function Navbar() {
  const [rotation, setRotation] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function LogoRotate(angle) {
    setRotation(prev => prev + angle)
  }

  return (
    <nav className="fixed pt-8 top-0 left-0 right-0 z-50 w-full py-4 sm:pb-10">
      {/* Blur background with fade to transparent at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(23,23,23,0) 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 10%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 10%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)',
        }}>
      </div>
      
      {/* Navbar content */}
      <div className="relative z-10 w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link to="/" onMouseEnter={() => LogoRotate(90)} className="flex-shrink-0">
            <svg 
              className="fill-custom-white transition-transform duration-1000 ease-out drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
              id="Layer_2" 
              data-name="Layer 2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 253 288.98" 
              width="48"
              height="48"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center',
              }}>
              <g id="Layer_1-2" data-name="Layer 1">
                <polygon points="253 81.14 253 219.71 229 233.56 229 122.71 205.01 136.56 205 136.56 205 136.57 181 150.42 157 164.28 157 247.41 181 233.56 181 178.13 205 164.28 205 247.42 181.01 261.27 181 261.27 157 275.13 133.01 288.98 133 288.98 133 150.42 181 122.7 205 108.85 229 94.99 253 81.14"/>
                <polygon points="24 205.84 48 219.7 72 233.55 72 233.56 72.01 233.56 96 247.41 96 219.7 72 205.85 72 205.84 48 191.99 48 164.27 72 178.13 72.01 178.13 96 191.98 96 191.99 120 205.84 120 288.98 96 275.13 72 261.27 48 247.42 0 219.7 0 81.14 24 95 47.99 108.85 48 108.85 72 122.71 95.99 136.56 96 136.56 96 136.57 120 150.42 120 178.13 96 164.28 72 150.42 48 136.56 24 122.71 24 205.84"/>
                <polygon points="246 69.28 222.01 83.14 222 83.14 198 97 174 110.85 150 124.71 126 138.56 102 124.71 102 124.7 78 110.85 54 96.99 30 83.14 6 69.28 30 55.43 54 41.57 54.01 41.57 78 27.72 78 27.71 102 13.86 102.01 13.86 126 0 150 13.86 126 27.71 102 41.57 78 55.42 54 69.28 77.99 83.14 78 83.14 102 96.99 102 97 125.99 110.85 126 110.85 150 96.99 174 83.14 174 83.13 198 69.28 174.01 55.42 174 55.42 174 55.43 150 69.28 126 83.14 102 69.28 125.99 55.42 126 55.42 150 41.57 150 41.56 174 27.71 198 41.57 222 55.42 222 55.43 246 69.28"/>
              </g>
            </svg>
          </Link>
          
               {/* Hamburger Menu Button - Mobile Only */}
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="sm:hidden text-custom-white hover:text-teal transition-colors duration-200 p-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                 aria-label="Toggle menu"
               >
                 {isMobileMenuOpen ? (
                   <X className="w-6 h-6" />
                 ) : (
                   <Menu className="w-6 h-6" />
                 )}
               </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex flex-wrap justify-end items-center gap-3 sm:gap-4 md:gap-6 p-0 m-0">
          <li>
            <Github 
              className="stroke-custom-white hover:stroke-teal transition-colors duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
              size={28} 
              strokeWidth={1.5} 
              onClick={() => window.open('https://github.com/gavinpicard', '_blank')}
            />
          </li>
          <li>
            <Linkedin 
              className="stroke-custom-white hover:stroke-teal transition-colors duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
              size={28} 
              strokeWidth={1.5} 
              onClick={() => window.open('https://www.linkedin.com/in/gavinpicard/', '_blank')}
            />
          </li>
          <li className="hidden sm:block">
            <hr className="border-t border-custom-gray w-12 h-px mx-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          </li>
          <li>
            <Link to="/" className="text-custom-white font-medium text-base sm:text-lg flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 border-b-2 border-transparent hover:border-teal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/glog" className="text-custom-white font-medium text-base sm:text-lg flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 border-b-2 border-transparent hover:border-teal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              GLOG
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="text-custom-white font-medium text-base sm:text-lg flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 border-b-2 border-transparent hover:border-teal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              PORTFOLIO
            </Link>
          </li>
          <li>
            <a 
              href="/resume.pdf" 
              download="Gavin_Picard_Resume.pdf"
              className="text-custom-white font-medium text-base sm:text-lg flex items-center gap-2 no-underline hover:text-teal transition-all duration-200 px-3 py-1.5 rounded-lg bg-background-secondary/50 hover:bg-background-secondary border border-background-tertiary/50 hover:border-teal/50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              <Download className="w-4 h-4" />
              RESUME
            </a>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden w-full mt-4 bg-background-secondary/95 backdrop-blur-md rounded-2xl p-4 border border-background-tertiary">
            <ul className="flex flex-col gap-4 p-0 m-0">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Github 
                    className="stroke-custom-white hover:stroke-teal transition-colors duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                    size={24} 
                    strokeWidth={1.5} 
                    onClick={() => window.open('https://github.com/gavinpicard', '_blank')}
                  />
                  <Linkedin 
                    className="stroke-custom-white hover:stroke-teal transition-colors duration-200 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                    size={24} 
                    strokeWidth={1.5} 
                    onClick={() => window.open('https://www.linkedin.com/in/gavinpicard/', '_blank')}
                  />
                </div>
              </li>
              <li>
                <hr className="border-t border-custom-gray" />
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-custom-white font-medium text-base flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 py-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link 
                  to="/glog" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-custom-white font-medium text-base flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 py-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                >
                  GLOG
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-custom-white font-medium text-base flex items-center gap-2 no-underline hover:text-teal transition-colors duration-200 py-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                >
                  PORTFOLIO
                </Link>
              </li>
              <li>
                <a 
                  href="/resume.pdf" 
                  download="Gavin_Picard_Resume.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-custom-white font-medium text-base flex items-center gap-2 no-underline hover:text-teal transition-all duration-200 py-2 px-3 rounded-lg bg-background-tertiary/50 hover:bg-background-tertiary border border-background-tertiary/50 hover:border-teal/50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                >
                  <Download className="w-4 h-4" />
                  RESUME
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

