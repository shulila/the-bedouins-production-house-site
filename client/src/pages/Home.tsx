import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Mail, MessageCircle, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredTeamMember, setHoveredTeamMember] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const teamMembers: Array<{
    id: string;
    name: string;
    role: string;
    bio: string;
    expertise: string[];
    gradient: string;
    image: string;
    imageScale?: number;
  }> = [
    {
      id: "shila",
      name: "Shilla Bahar",
      role: "Founder, AI Creator & Designer",
      bio: "Founder of The Bedouins. AI creator and designer crafting visual worlds where technology amplifies creative vision and every tool serves the story.",
      expertise: ["Founder", "AI Creation", "Visual Design"],
      gradient: "from-[#3abfb5] to-[#9d4edd]",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/116189056/fORmGJnVKqsSfmjD.png"
    },
    {
      id: "nimrod",
      name: "Nimrod Reshef",
      role: "Director",
      bio: "Visionary storyteller with decades of experience in directing and visual narrative design. Brings cinematic excellence to every frame.",
      expertise: ["Directing", "Storyboarding", "Visual Narrative"],
      gradient: "from-[#3abfb5] to-[#2a9d94]",
      image: "/images/nimrod-turquoise.png"
    },
    {
      id: "ella",
      name: "Ella Taran",
      role: "AI Animation & Editor",
      bio: "Pioneer in AI-driven animation and visual effects. Combines cutting-edge technology with artistic vision to create stunning animations.",
      expertise: ["AI Animation", "VFX", "Video Editing"],
      gradient: "from-[#9d4edd] to-[#7b2cbf]",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/116189056/aLRmQRTkGuTOrrGk.png"
    },
    {
      id: "yaron",
      name: "Yaron Bahar",
      role: "Sound Designer & Composer",
      bio: "Master of sonic landscapes. Creates immersive soundscapes and original compositions that elevate every project.",
      expertise: ["Composition", "Sound Design", "Engineering"],
      gradient: "from-[#df6924] to-[#c5581b]",
      image: "/images/yaron-orange.png",
      imageScale: 1.08,
    },
    {
      id: "gal",
      name: "Gal Ziv",
      role: "Content Creator, Entrepreneur & Producer",
      bio: "Specializing in visual content development, production, and digital accessibility through the integration of technology and AI tools.",
      expertise: ["Visual Content", "Production", "Accessibility"],
      gradient: "from-[#d946ef] to-[#a21caf]",
      image: "/images/gal-magenta-v2.png",
    },
  ];

  const portfolioProjects: Array<{ src: string; title: string; subtitle: string }> = [
    { src: "/videos/arlozorov-final.mp4", title: "Who Killed Arlozorov", subtitle: "Educational Visual Experience" },
    { src: "/videos/ai-6.mp4", title: "Motion Graphics", subtitle: "Brand Animation" },
    { src: "/videos/ai-2.mp4", title: "Animated Worlds Beyond Reality", subtitle: "AI Worldbuilding" },
    { src: "/videos/ai-3.mp4", title: "Experimental Visual Experiences", subtitle: "Visual Innovation" },
    { src: "/videos/ai-5.mp4", title: "Historical Reconstructions", subtitle: "Visual Reenactments" },
    { src: "/videos/ai-4.mp4", title: "AI Cinematic Storytelling", subtitle: "Generative Cinema" },
    { src: "/videos/ai-1.mp4", title: "Creative Concepts", subtitle: "AI Visual Studies" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">
      {/* Hidden SVG filter: chroma-keys pure black out of the camel video so it can sit on a light hero in light theme */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="hide-black-pixels">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  3 3 3 0 -0.5"
            />
          </filter>
        </defs>
      </svg>

      {/* Sticky Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 md:h-24 bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-3 sm:px-4 h-full flex items-center justify-between">
          {/* Logo Container - height-based sizing to fill the bar with margins */}
          <div
            className="h-full flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={scrollToTop}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116189056/BGukRTVCbgkgHLWC.png"
              alt="The Bedouins"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Icons cluster: Mail + WhatsApp + Theme Toggle, all same size, equal spacing */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=thebedouins.ai@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="Email us"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </a>
            <a
              href="https://wa.me/972545534560"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </a>
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - theme-respecting background */}
      <section className={`relative min-h-screen flex flex-col items-center justify-start md:justify-center pt-20 sm:pt-24 pb-10 sm:pb-12 md:py-20 overflow-x-hidden w-full ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
        {/* Psychedelic Background Layer - Removed to ensure seamless black background for video
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: 'url("/images/freepik__talk__88219-art-scale-4_00x.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px) saturate(1.5)',
          }}
        />
        */}
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 w-full lg:h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-16">
          
          {/* Text Content - Left */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 pt-8 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-primary mb-4 sm:mb-6 drop-shadow-lg font-display leading-tight">
              Bringing Stories to Life with AI, Art and Sound
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
              We are The Bedouins - a premium creative studio blending cutting-edge AI with world-class design, sound, and storytelling. From short films to commercials and beyond, we turn ideas into immersive visual experiences.
            </p>
            
            {/* Buttons - side-by-side on mobile too, so both sit above the fold */}
            <div className="flex flex-row gap-3 sm:gap-6 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#3abfb5] hover:bg-[#3abfb5] text-black font-bold px-4 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-[0_0_20px_rgba(58,193,182,0.4)] hover:shadow-[0_0_30px_rgba(58,193,182,0.6)] transition-all duration-300 hover:scale-105 border-none flex-1 sm:flex-initial"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#3abfb5] text-[#3abfb5] hover:bg-[#3abfb5]/10 px-4 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-[0_0_15px_rgba(58,193,182,0.2)] hover:shadow-[0_0_25px_rgba(58,193,182,0.4)] transition-all duration-300 hover:scale-105 bg-transparent flex-1 sm:flex-initial"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start a Project
              </Button>
            </div>
          </div>

          {/* Logo/Video - Right - Increased Size */}
          <div className="w-full lg:w-[60%] relative aspect-video animate-in zoom-in duration-1000 flex justify-end translate-x-0 lg:translate-x-24">
            <div className="absolute inset-0 bg-[#3abfb5] rounded-full blur-[120px] opacity-20 animate-pulse" />
            <video
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116189056/KAoYvMUyJAmLAWyA.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-contain relative z-10 scale-[1.4] sm:scale-[1.3] md:scale-125 origin-center ${theme === 'dark' ? 'mix-blend-screen' : ''}`}
              style={{
                maskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
                ...(theme === 'light' && { filter: 'url(#hide-black-pixels)' }),
              }}
            />
          </div>
        </div>

        
      </section>

      {/* Portfolio Section - Moved Up */}
      <section id="portfolio" className="py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden">
        {/* Psychedelic Background Layer for Dark Mode */}
        {theme === 'dark' && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: 'url("/images/freepik__talk__88219-art-scale-4_00x.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(60px) saturate(1.2)',
            }}
          />
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 sm:mb-16 text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              The Craft
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              A showcase of our work, where storytelling meets precision, and technology meets emotion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Project Video Card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-black/40 border-primary/30 overflow-hidden group hover:border-primary/60 transition-all duration-500 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/vqB3MhYCFuM?controls=0&rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playsinline=1&playlist=vqB3MhYCFuM"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="ARI'S KNIFE - Featured Project"
                />
              </div>
              <CardContent className="p-6 relative z-10 bg-background/80 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-primary mb-2">From Script to Soul</h3>
                <p className="text-muted-foreground">A glimpse to a 15 minutes short film crafted from a client's script, where written story becomes living cinema</p>
              </CardContent>
            </Card>

            {/* Project Cards */}
            {portfolioProjects.map((project, idx) => {
              const isLonelyLast =
                idx === portfolioProjects.length - 1 &&
                portfolioProjects.length % 3 === 1;
              return (
                <Card
                  key={project.src}
                  className={`bg-primary/5 border-primary/30 backdrop-blur-sm overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)] ${
                    isLonelyLast
                      ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto lg:col-span-3 lg:w-[calc(33.333%-1.333rem)] lg:mx-auto"
                      : ""
                  }`}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <video
                      src={project.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-background">
        {/* Psychedelic Background Layer for Dark Mode */}
        {theme === 'dark' && (
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: 'url("/images/freepik__talk__88219-art-scale-4_00x.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(60px) saturate(1.2)',
            }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 sm:mb-16 text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              Our Services
            </h2>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Story Alchemy",
                desc: "We transform scripts, concepts or even half-formed thoughts into cinematic experiences. From narrative structure to art direction, our process blends intuition with craft to shape stories that resonate."
              },
              {
                title: "Echo-Crafted Sound",
                desc: "Led by one of the world’s top music producers, our sound is more than audio - it’s a voice. Each layer is composed to serve the story, stitched to its rhythm, and tailored to its emotional fabric. No templates. No stock. Just original, cinematic sound design made to fit - perfectly."
              },
              {
                title: "Fast Track Studio",
                desc: "Speed without compromise. We leverage AI-driven workflows to deliver high-end visuals at a pace traditional studios can't match."
              },
              {
                title: "End-to-End Visual Production",
                desc: "From brief to final master, we handle every step of the journey."
              }
            ].map((service, index) => (
              <Card key={index} className="bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)] h-auto min-h-[16rem]">
                <CardContent className="p-8 h-full flex flex-col justify-center text-left">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Restored Hover Cards) */}
      <section className="py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden">
        {/* Psychedelic Background Layer for Dark Mode */}
        {theme === 'dark' && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: 'url("/images/freepik__talk__88219-art-scale-4_00x.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(50px) saturate(1.5)',
            }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 sm:mb-16 text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              Our Tent
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Five masters of their craft, united by a shared vision of creative excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => {
              const isLonelyLast =
                teamMembers.length % 2 === 1 && idx === teamMembers.length - 1;
              return (
              <div
                key={member.id}
                className={`group cursor-pointer h-full perspective-1000 ${
                  isLonelyLast ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto" : ""
                }`}
                onMouseEnter={() => setHoveredTeamMember(member.id)}
                onMouseLeave={() => setHoveredTeamMember(null)}
              >
                <div
                  className={`relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${member.gradient} p-6 sm:p-8 flex flex-col justify-end transition-all duration-500 border border-primary/20 ${
                    hoveredTeamMember === member.id ? "shadow-[0_0_30px_rgba(58,193,182,0.4)] md:scale-105" : "shadow-lg"
                  }`}
                >
                  {/* Team Member Image Background - full opacity on both; fades only on md+ hover */}
                  {member.image && (
                    <div className={`absolute inset-0 z-0 transition-opacity duration-500 opacity-100 ${hoveredTeamMember === member.id ? 'md:opacity-0' : 'md:opacity-100'}`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        style={member.imageScale ? { transform: `scale(${member.imageScale})` } : undefined}
                        onError={(e) => {
                          const parent = e.currentTarget.parentElement;
                          if (parent) parent.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Top gradient: mobile only - keeps name+role readable at the top of the card */}
                  <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-black/90 to-transparent z-10 md:hidden" />

                  {/* Bottom gradient: bottom-half on mobile (for bio+tags), full height on md+ (the original behavior) */}
                  <div className="absolute bottom-0 inset-x-0 h-1/2 md:h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                  <div className="relative z-20 w-full h-full flex flex-col justify-between md:justify-end">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                      <p className="text-xs font-semibold text-white/90 uppercase tracking-wide">{member.role}</p>
                    </div>

                    {/* Description - Always visible on mobile, revealed on hover at md+ */}
                    <div className={`space-y-3 transition-all duration-500 overflow-hidden max-h-60 opacity-100 mt-2 ${
                      hoveredTeamMember === member.id
                        ? "md:max-h-60 md:opacity-100 md:mt-2"
                        : "md:max-h-0 md:opacity-0 md:mt-0"
                    }`}>
                      <p className="text-sm text-white/95 leading-relaxed font-medium">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {member.expertise.map((exp, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm font-semibold text-white border border-white/10"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden"> <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary drop-shadow-lg font-display">
                Let's Create Magic
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                Ready to bring your vision to life? Step into our tent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=thebedouins.ai@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                  <CardContent className="p-8 flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold text-primary">Email Us</h3>
                      <span className="block text-muted-foreground group-hover:text-primary transition-colors text-lg">
                        thebedouins.ai@gmail.com
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a
                href="https://wa.me/972545534560"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                  <CardContent className="p-8 flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold text-primary">WhatsApp</h3>
                      <span className="block text-muted-foreground group-hover:text-primary transition-colors text-lg">
                        Chat with us
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          {/* Footer Logo Removed */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} The Bedouins Production House. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
