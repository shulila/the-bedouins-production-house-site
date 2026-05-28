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
      id: "nimrod",
      name: "Nimrod Reshef",
      role: "Director",
      bio: "Visionary storyteller with decades of experience in directing and visual narrative design. Brings cinematic excellence to every frame.",
      expertise: ["Directing", "Storyboarding", "Visual Narrative"],
      gradient: "from-[#3abfb5] to-[#2a9d94]",
      image: "/images/nimrod-turquoise.png"
    },
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
      bio: "Master of sonic landscapes. Creates immersive soundscapes, original compositions, and professional audio design that elevates every project.",
      expertise: ["Music Composition", "Sound Design", "Audio Engineering"],
      gradient: "from-[#df6924] to-[#c5581b]",
      image: "/images/yaron-orange.png"
    },
    {
      id: "gal",
      name: "Gal Ziv",
      role: "Content Creator, Entrepreneur & Producer",
      bio: "Specializing in visual content development, production, and digital accessibility through the integration of technology and AI tools.",
      expertise: ["Visual Content", "Production", "Digital Accessibility"],
      gradient: "from-[#d946ef] to-[#a21caf]",
      image: "/images/gal-magenta.png",
    },
  ];

  const portfolioProjects: Array<{ src: string; title: string; subtitle: string }> = [
    { src: "/videos/arlozorov-final.mp4", title: "Arlozorov", subtitle: "Competition Entry" },
    { src: "/videos/ai-1.mp4", title: "AI Visual 01", subtitle: "Generative AI" },
    { src: "/videos/ai-2.mp4", title: "AI Visual 02", subtitle: "Generative AI" },
    { src: "/videos/ai-3.mp4", title: "AI Visual 03", subtitle: "Generative AI" },
    { src: "/videos/ai-4.mp4", title: "AI Visual 04", subtitle: "Generative AI" },
    { src: "/videos/ai-5.mp4", title: "AI Visual 05", subtitle: "Generative AI" },
    { src: "/videos/ai-6.mp4", title: "AI Visual 06", subtitle: "Generative AI" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">
      {/* Sticky Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-24 bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo Container - Increased Size */}
          <div
            className="w-72 md:w-64 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={scrollToTop}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116189056/BGukRTVCbgkgHLWC.png"
              alt="The Bedouins"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Contact Icons - aligned to content right edge */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:thebedouins.ai@gmail.com"
              className="p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="Email us"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://wa.me/972545534560"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-4 md:right-6 z-50 p-1 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300 scale-90 md:scale-100"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-primary" />
        )}
      </button>

      {/* Hero Section - Always Dark Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-start md:justify-center pt-16 pb-12 md:py-20 overflow-hidden bg-black w-full">
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
        <div className="container mx-auto px-4 relative z-10 w-full h-full flex flex-col-reverse lg:flex-row items-center justify-between gap-0 lg:gap-16">
          
          {/* Text Content - Left */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 pt-8 lg:pt-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary mb-6 drop-shadow-lg font-display leading-tight">
              Bringing Stories to Life with AI, Art and Sound
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
              We are The Bedouins - a premium creative studio blending cutting-edge AI with world-class design, sound, and storytelling. From short films to commercials and beyond, we turn ideas into immersive visual experiences.
            </p>
            
            {/* Buttons - Left Aligned */}
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-[#3abfb5] hover:bg-[#3abfb5] text-black font-bold px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(58,193,182,0.4)] hover:shadow-[0_0_30px_rgba(58,193,182,0.6)] transition-all duration-300 hover:scale-105 border-none w-full sm:w-auto"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#3abfb5] text-[#3abfb5] hover:bg-[#3abfb5]/10 px-8 py-6 text-lg rounded-full shadow-[0_0_15px_rgba(58,193,182,0.2)] hover:shadow-[0_0_25px_rgba(58,193,182,0.4)] transition-all duration-300 hover:scale-105 bg-transparent w-full sm:w-auto"
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
              className="w-full h-full object-contain relative z-10 scale-110 origin-right mix-blend-screen"
            />
          </div>
        </div>

        
      </section>

      {/* Portfolio Section - Moved Up */}
      <section id="portfolio" className="py-16 md:py-24 relative bg-background overflow-hidden">
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
          <div className="mb-16 text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              The Craft
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A showcase of our work, where storytelling meets precision, and technology meets emotion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Project Video Card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-black/40 border-primary/30 overflow-hidden group hover:border-primary/60 transition-all duration-500 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/vqB3MhYCFuM?si=featured-project&controls=0&showinfo=0&rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=vqB3MhYCFuM"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
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
      <section className="py-16 md:py-24 relative overflow-hidden bg-background">
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
          <div className="mb-16 text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Not just services, but rituals of craft, designed to move, echo, and transform. This is how we shape stories the Bedouin way. 
            </p>
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
      <section className="py-24 relative bg-background overflow-hidden">
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
          <div className="mb-16 text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-primary drop-shadow-lg font-display">
              Our Tent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
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
                  className={`relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${member.gradient} p-8 flex flex-col justify-end transition-all duration-500 border border-primary/20 ${
                    hoveredTeamMember === member.id ? "shadow-[0_0_30px_rgba(58,193,182,0.4)] scale-105" : "shadow-lg"
                  }`}
                >
                  {/* Team Member Image Background - Disappears on Hover */}
                  {member.image && (
                    <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${hoveredTeamMember === member.id ? 'opacity-0' : 'opacity-100'}`}>
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
                  
                  {/* Gradient Overlay - Always present but adjusted for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 ${hoveredTeamMember === member.id ? 'opacity-100 bg-black/80' : 'opacity-100'}`} />
                  
                  <div className="relative z-20 w-full h-full flex flex-col justify-end">
                    <div className={`transition-all duration-500 ${hoveredTeamMember === member.id ? 'translate-y-0' : 'translate-y-0'}`}>
                      <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                      <p className="text-xs font-semibold text-white/90 mb-3 uppercase tracking-wide">{member.role}</p>
                    </div>
                    
                    {/* Description - Revealed on Hover */}
                    <div className={`space-y-3 transition-all duration-500 overflow-hidden ${hoveredTeamMember === member.id ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
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
      <section id="contact" className="py-16 md:py-24 relative bg-background overflow-hidden"> <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-primary drop-shadow-lg font-display">
                Let's Create Magic
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to bring your vision to life? Step into our tent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                <CardContent className="p-8 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">Email Us</h3>
                    <a href="mailto:thebedouins.ai@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      thebedouins.ai@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                <CardContent className="p-8 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">WhatsApp</h3>
                    <a 
                      href="https://wa.me/972545534560" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      Chat with us
                    </a>
                  </div>
                </CardContent>
              </Card>
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
