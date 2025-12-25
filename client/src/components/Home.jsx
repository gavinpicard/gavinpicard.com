import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImg from '../assets/cover.jpg';
import axios from 'axios';
import { API_ENDPOINTS, getImageUrl } from '../config/api';
import { ArrowRight, Code, BookOpen, Sparkles, Code2, Zap, Laptop, Headphones } from 'lucide-react';
import { 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiDocker,
  SiLinux,
  SiCplusplus,
  SiMysql,
  SiDotnet,
  SiLua,
  SiSwift
} from 'react-icons/si';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINTS.POSTS).then(response => {
      setPosts(response.data);
    });
  }, []);

  function BlogDate({ createdAt }) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const humanDate = date.toLocaleDateString(undefined, options);
    return (
      <p className="text-xs text-custom-gray m-0 font-medium uppercase tracking-wide">
        {humanDate}
      </p>
    );
  }

  function truncate(str, max = 60) {
    return str.length > max ? str.slice(0, max) + '…' : str;
  }

  return (
    <div className="relative">
      <img 
        className="absolute left-0 top-0 z-0 h-screen object-cover drop-shadow-lg w-full" 
        style={{ willChange: 'transform' }}
        src={coverImg}
        alt="Cover"
      />
      <div className="relative z-10 flex flex-col w-[90%] max-w-5xl mx-auto pt-36 sm:pt-32 md:pt-40 text-left min-h-screen px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 md:mb-4 text-custom-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Hi, I'm Gavin Picard
        </h1>
        <p className="text-base w-[60%] sm:text-lg md:text-xl text-custom-white leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          I'm a Computer Science student at the <span className="text-orange font-semibold">University of Tennessee, Knoxville</span>
        </p>
      </div>
      {/* Colored squares positioned at the divide */}
      <div className="relative bottom-[10rem] z-20 flex justify-start w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8" style={{ marginTop: '-1rem', marginBottom: '-1rem' }}>
        <div className="flex">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue rounded-l"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-off-white"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-custom-white"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-custom-gray"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brown"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark-gray rounded-r"></div>
        </div>
      </div>
      {/* About Section - Redesigned */}
      <div className="relative z-10">
        {/* Divider with spacing - reduced because colored squares already create spacing */}
        <div className="h-16 sm:h-24 md:h-32"></div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
        <div className="w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex items-center justify-start gap-4 mb-16">
            <div className="bg-background-secondary rounded-2xl sm:rounded-3xl p-4 border border-background-tertiary shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue drop-shadow-[0_2px_8px_rgba(45,128,116,0.5)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-white text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              ABOUT
            </h2>
          </div>
          
          {/* Main About Content - Text Block Format */}
          <div className="w-full space-y-8 sm:space-y-12 md:space-y-16">
            {/* Opening */}
            <div className="relative">
              <p className="text-left text-base sm:text-lg md:text-xl text-custom-white leading-relaxed">
              I've always been drawn to <span className="text-blue font-medium">making things</span>. <span className="text-teal font-medium">Software, ideas, little systems</span> that make life feel a bit more interesting or expressive. It doesn't matter if it's something practical or something I made just because I was <span className="text-green font-medium">curious</span>; the <span className="text-orange font-medium">process of building</span> is what I enjoy. There's something satisfying watching a vague idea turn into something that works, or something that at least teaches me.
              </p>
            </div>

            {/* Technology Section */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue via-teal via-green/60 to-transparent rounded-full shadow-[0_0_8px_rgba(45,128,116,0.3)]"></div>
              <div className="flex items-start gap-4 pl-8 sm:pl-12">
                <div className="flex-shrink-0 mt-1 p-2 bg-background-secondary/50 rounded-lg border border-teal/20">
                  <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-teal drop-shadow-[0_2px_8px_rgba(95,135,95,0.4)]" />
                </div>
                <p className="text-left text-base sm:text-lg text-custom-white leading-relaxed">
                My desire has always been to create <span className="text-teal font-medium">tools</span>. Not necessarily "products" or "platforms," but things that make people <span className="text-green font-medium">more capable</span>. I believe <span className="text-teal font-medium">technology</span> is best when it serves as an <span className="text-blue font-medium">amplifier</span>: something that lets people do more than they could without it. I also think what I build should feel good to use: <span className="text-green font-medium">intuitive, a bit playful</span>, and grounded in how people actually think. 
                </p>
              </div>
            </div>

            {/* Music Section */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green via-orange/60 to-transparent rounded-full shadow-[0_0_8px_rgba(135,175,135,0.3)]"></div>
              <div className="flex items-start gap-4 pl-8 sm:pl-12">
                <div className="flex-shrink-0 mt-1 p-2 bg-background-secondary/50 rounded-lg border border-green/20">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-green drop-shadow-[0_2px_8px_rgba(135,175,135,0.4)]" />
                </div>
                <p className="text-left text-base sm:text-lg text-custom-white leading-relaxed">
                <span className="text-green font-medium">Music</span> is the other big part of my life. I play <span className="text-orange font-medium">guitar</span>, and have released a few songs with my former band <span className="text-green font-medium">"Modern Day Miracle."</span> I think music gives me a <span className="text-blue font-medium">different way of seeing things</span>. It carries over into how I <span className="text-teal font-medium">design and write code</span>. I feel the same part of my brain activates when I write music and code. <span className="text-orange font-medium">It is all art to me</span>.
                </p>
              </div>
            </div>

            {/* Philosophy/Interests Section */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/80 to-transparent rounded-full shadow-[0_0_8px_rgba(175,135,95,0.3)]"></div>
              <div className="flex items-start gap-4 pl-8 sm:pl-12">
                <div className="flex-shrink-0 mt-1 p-2 bg-background-secondary/50 rounded-lg border border-orange/20">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-orange drop-shadow-[0_2px_8px_rgba(175,135,95,0.4)]" />
                </div>
                <p className="text-left text-base sm:text-lg text-custom-white leading-relaxed">
                At the core, I am someone who follows <span className="text-orange font-medium">curiosity</span> wherever it goes. I know it is cliche, but I truly want to be a <span className="text-blue font-medium">lifelong learner</span>. I enjoy figuring out how <span className="text-teal font-medium">systems work</span>. If there is ever anything that feels <span className="text-green font-medium">counterintuitive</span> to me, I always seek to understand why. I want to understand <span className="text-orange font-medium">how the world works</span>, why some things feel right, how people think, why certain ideas resonate, and <span className="text-blue font-medium">how I can make an impact</span>.
                </p>
              </div>
            </div>

            {/* Closing */}
            <div className="relative pt-8">
              <p className="text-left text-base sm:text-lg md:text-xl text-custom-white leading-relaxed">
              Right now, I am finishing my degree in <span className="text-teal font-medium">Computer Science</span> at the <span className="text-orange font-semibold">University of Tennessee</span> and working on a handful of projects. My primary project is <span className="text-blue font-medium">VOLCRAFT</span>, a <span className="text-green font-medium">Minecraft server</span> I run for students at my university.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="relative">
            {/* Divider with spacing */}
            <div className="h-24 sm:h-32 md:h-40 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-green/30 to-transparent"></div>
            </div>
            <div className="flex items-center justify-start gap-4 mb-8">
              <div className="bg-background-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-background-tertiary shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-green drop-shadow-[0_2px_8px_rgba(135,175,135,0.5)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Skills & Tools
              </h3>
            </div>
            <p className="text-left text-custom-gray mb-16 text-base sm:text-lg">
              Technologies I work with
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {[
                { name: 'C++', Icon: SiCplusplus, category: 'language' },
                { name: 'MySQL', Icon: SiMysql, category: 'database' },
                { name: 'TypeScript', Icon: SiTypescript, category: 'language' },
                { name: 'React', Icon: SiReact, category: 'framework' },
                { name: 'Python', Icon: SiPython, category: 'language' },
                { name: 'Java', Icon: Code2, category: 'language' },
                { name: 'Linux', Icon: SiLinux, category: 'system' },
                { name: 'Docker', Icon: SiDocker, category: 'tool' },
                { name: 'C#', Icon: SiDotnet, category: 'language' },
                { name: 'Lua', Icon: SiLua, category: 'language' },
                { name: 'Node.js', Icon: SiNodedotjs, category: 'runtime' },
                { name: 'Swift', Icon: SiSwift, category: 'language' }
              ].map((skill, index) => {
                const colors = {
                  language: 'bg-blue/20 border-blue/30 hover:bg-blue/30',
                  framework: 'bg-green/20 border-green/30 hover:bg-green/30',
                  tool: 'bg-yellow/20 border-yellow/30 hover:bg-yellow/30',
                  database: 'bg-orange/20 border-orange/30 hover:bg-orange/30',
                  cloud: 'bg-red/20 border-red/30 hover:bg-red/30',
                  runtime: 'bg-off-white/20 border-off-white/30 hover:bg-off-white/30',
                  system: 'bg-custom-gray/20 border-custom-gray/30 hover:bg-custom-gray/30',
                  concept: 'bg-custom-white/20 border-custom-white/30 hover:bg-custom-white/30'
                };
                
                const IconComponent = skill.Icon;
                return (
                  <div
                    key={skill.name}
                    className={`group relative ${colors[skill.category] || 'bg-background-secondary border-background-tertiary'} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-default shadow-[0_4px_16px_rgba(0,0,0,0.3)]`}
                    title={skill.name}
                  >
                    <div className="flex flex-col items-center justify-center text-center h-full gap-2">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-custom-white group-hover:text-off-white transition-colors duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                      <span className="text-custom-white font-semibold text-xs sm:text-sm group-hover:text-off-white transition-colors duration-200">
                        {skill.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-transparent to-dark-gray/10 group-hover:from-transparent group-hover:to-dark-gray/20 transition-all duration-300 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Blog Section - Fixed positioning */}
      <div className="relative z-10 min-h-screen">
        {/* Divider with spacing - this handles spacing between Skills and Blog */}
        <div className="h-24 sm:h-32 md:h-40 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green/30 to-transparent"></div>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
        <div className="w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-16">
            <div className="flex items-center gap-4">
              <div className="bg-background-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-background-tertiary shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green drop-shadow-[0_2px_8px_rgba(135,175,135,0.5)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                GLOG
              </h2>
            </div>
            <button
              onClick={() => navigate('/glog')} 
              className="bg-background-secondary rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-custom-white text-base sm:text-lg flex items-center gap-2 hover:bg-background-tertiary hover:text-teal transition-all duration-200 cursor-pointer border border-background-tertiary shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            >
              Read More
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
           {posts.length === 0 ? (
             <div className="w-full py-12 sm:py-16 flex flex-col items-center justify-center text-center">
               <p className="text-lg sm:text-xl text-custom-gray mb-3">
                 No blog posts yet
               </p>
               <p className="text-sm sm:text-base text-custom-gray/80">
                 Posts are coming soon!
               </p>
             </div>
           ) : (
           <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
             {posts.slice(0, 4).map((post) => (
               <article
                 key={post.id || post.title}
                 className="group cursor-pointer"
                 onClick={() =>
                   navigate(`/glog/${post.title}`, { state: { blog: post } })
                 }
               >
                 <div className="relative aspect-[21/9] sm:aspect-[16/6] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-background-tertiary shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)] transition-all duration-300">
                   <img
                     className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                     src={getImageUrl(post.cover_path)}
                     alt={post.title}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/95 via-dark-gray/60 to-dark-gray/20"></div>
                   <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-8">
                     <div className="text-left space-y-2 lg:space-y-2">
                       <div className="text-xs sm:text-sm text-teal font-medium uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                         <BlogDate createdAt={post.created_at} />
                       </div>
                       <h3 className="text-2xl sm:text-3xl lg:text-xl xl:text-2xl font-bold text-custom-white leading-tight group-hover:text-teal transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                         {truncate(post.title, 60)}
                       </h3>
                       {post.lede && (
                         <p className="text-sm sm:text-base lg:text-xs xl:text-sm text-custom-gray/95 leading-relaxed line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                           {truncate(post.lede, 80)}
                         </p>
                       )}
                     </div>
                   </div>
                 </div>
               </article>
             ))}
          </div>
          )}
        </div>
        {/* Bottom spacing */}
        <div className="h-24 sm:h-32 md:h-40"></div>
      </div>
    </div>
  );
}

export default Home;



