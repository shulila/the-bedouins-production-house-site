import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Mail, MessageCircle, Moon, Pause, Play, Send, Sun, Volume2, VolumeX } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "thebedouins.ai@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;
const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const WHATSAPP_URL = "https://wa.me/972545534560";
const CAPTIONS_ENABLED = false;
const EAGER_PROJECT_VIDEO_IDS = ["showreel", "arlozorov", "ben-gurion"];
const DEFAULT_CONTACT_FORM = {
  name: "",
  email: "",
  projectType: "AI video / cinematic piece",
  message: "",
};
const DEFAULT_PROJECT_VIDEO_STATE = {
  isMuted: true,
  isPlaying: true,
  volume: 0.75,
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type ContactFormState = typeof DEFAULT_CONTACT_FORM;
type ProjectVideoState = typeof DEFAULT_PROJECT_VIDEO_STATE;
type PortfolioProject = {
  id: string;
  src: string;
  poster: string;
  title: string;
  subtitle: string;
  captionSrc?: string;
};

const navItems = [
  { label: "Work", target: "portfolio" },
  { label: "Services", target: "services" },
  { label: "Team", target: "team" },
  { label: "Contact", target: "contact" },
];

const projectTypeOptions = [
  "AI video / cinematic piece",
  "Animation / motion graphics",
  "Sound design / music",
  "Creative direction / concept",
  "Not sure yet",
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredTeamMember, setHoveredTeamMember] = useState<string | null>(null);
  const [projectVideoStates, setProjectVideoStates] = useState<Record<string, ProjectVideoState>>({});
  const [loadedProjectVideos, setLoadedProjectVideos] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(EAGER_PROJECT_VIDEO_IDS.map((id) => [id, true]))
  );
  const [contactForm, setContactForm] = useState<ContactFormState>(DEFAULT_CONTACT_FORM);
  const [contactStatus, setContactStatus] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const introSoundRef = useRef<HTMLAudioElement | null>(null);
  const introSoundPlayedRef = useRef(false);
  const projectVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const projectVideoContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const events: Array<keyof WindowEventMap> = ["pointerdown", "touchstart", "click", "keydown"];
    let playInProgress = false;

    const removeFallbackListeners = () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstInteraction);
      });
    };

    const playIntroSound = async () => {
      const audio = introSoundRef.current;
      if (!audio || introSoundPlayedRef.current || playInProgress) return;

      playInProgress = true;
      try {
        audio.currentTime = 0;
        audio.volume = 0.75;
        await audio.play();
        introSoundPlayedRef.current = true;
        removeFallbackListeners();
      } catch {
        playInProgress = false;
      }
    };

    function handleFirstInteraction() {
      void playIntroSound();
    }

    events.forEach((eventName) => {
      window.addEventListener(eventName, handleFirstInteraction, { passive: true });
    });

    const fallbackTimer = window.setTimeout(removeFallbackListeners, 8000);

    void playIntroSound();

    return () => {
      window.clearTimeout(fallbackTimer);
      removeFallbackListeners();
    };
  }, [mounted]);

  const trackSiteEvent = (eventName: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") return;

    const event = {
      event: eventName,
      ...payload,
    };

    window.dataLayer?.push(event);
    window.dispatchEvent(new CustomEvent("bedouins:analytics", { detail: event }));
  };

  const scrollToTop = () => {
    trackSiteEvent("navigation_click", { target: "top" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (target: string) => {
    trackSiteEvent("navigation_click", { target });
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleTheme = () => {
    trackSiteEvent("theme_toggle", { theme: theme === "dark" ? "light" : "dark" });
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getProjectVideoState = (id: string) => ({
    ...DEFAULT_PROJECT_VIDEO_STATE,
    ...projectVideoStates[id],
  });

  const setProjectVideoRef = (id: string) => (node: HTMLVideoElement | null) => {
    if (node) {
      projectVideoRefs.current[id] = node;
    } else {
      delete projectVideoRefs.current[id];
    }
  };

  const setProjectVideoContainerRef = (id: string) => (node: HTMLDivElement | null) => {
    if (node) {
      projectVideoContainerRefs.current[id] = node;
    } else {
      delete projectVideoContainerRefs.current[id];
    }
  };

  const markProjectVideoLoaded = (id: string) => {
    setLoadedProjectVideos((current) => {
      if (current[id]) return current;
      return { ...current, [id]: true };
    });
  };

  const updateProjectVideoState = (id: string, updates: Partial<ProjectVideoState>) => {
    setProjectVideoStates((current) => ({
      ...current,
      [id]: {
        ...DEFAULT_PROJECT_VIDEO_STATE,
        ...current[id],
        ...updates,
      },
    }));
  };

  const muteOtherProjectVideos = (activeId: string) => {
    Object.entries(projectVideoRefs.current).forEach(([id, video]) => {
      if (id !== activeId && video) {
        video.muted = true;
      }
    });

    setProjectVideoStates((current) => {
      const next = { ...current };
      Object.keys(projectVideoRefs.current).forEach((id) => {
        if (id !== activeId) {
          next[id] = {
            ...DEFAULT_PROJECT_VIDEO_STATE,
            ...current[id],
            isMuted: true,
          };
        }
      });
      return next;
    });
  };

  const toggleProjectPlayback = async (id: string) => {
    const video = projectVideoRefs.current[id];
    if (!video) {
      markProjectVideoLoaded(id);
      return;
    }

    if (video.paused) {
      try {
        markProjectVideoLoaded(id);
        await video.play();
        updateProjectVideoState(id, { isPlaying: true });
        trackSiteEvent("video_play", { videoId: id });
      } catch {
        updateProjectVideoState(id, { isPlaying: false });
      }
    } else {
      video.pause();
      updateProjectVideoState(id, { isPlaying: false });
      trackSiteEvent("video_pause", { videoId: id });
    }
  };

  const toggleProjectSound = async (id: string) => {
    const video = projectVideoRefs.current[id];
    if (!video) {
      markProjectVideoLoaded(id);
      return;
    }

    const state = getProjectVideoState(id);
    const nextMuted = !state.isMuted;

    if (!nextMuted) {
      markProjectVideoLoaded(id);
      muteOtherProjectVideos(id);
      video.volume = state.volume;
      if (video.paused) {
        try {
          await video.play();
          updateProjectVideoState(id, { isPlaying: true });
        } catch {
          updateProjectVideoState(id, { isPlaying: false });
        }
      }
    }

    video.muted = nextMuted;
    updateProjectVideoState(id, { isMuted: nextMuted });
    trackSiteEvent(nextMuted ? "video_mute" : "video_unmute", { videoId: id });
  };

  const handleProjectVolumeChange = (id: string, value: string) => {
    const volume = Number(value);
    const video = projectVideoRefs.current[id];
    const nextMuted = volume === 0;

    if (video) {
      video.volume = volume;
      video.muted = nextMuted;
    }

    if (!nextMuted) {
      muteOtherProjectVideos(id);
    }

    updateProjectVideoState(id, {
      volume,
      isMuted: nextMuted,
    });

    if (!nextMuted) {
      trackSiteEvent("video_volume", { videoId: id, volume });
    }
  };

  const updateContactField = (field: keyof ContactFormState, value: string) => {
    setContactForm((current) => ({
      ...current,
      [field]: value,
    }));
    setContactStatus("");
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackSiteEvent("contact_form_submit", { projectType: contactForm.projectType });
    setIsContactSubmitting(true);
    setContactStatus("Sending...");

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          projectType: contactForm.projectType,
          message: contactForm.message,
          _subject: `New project inquiry - ${contactForm.projectType}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      trackSiteEvent("contact_form_success", { projectType: contactForm.projectType });
      setContactForm(DEFAULT_CONTACT_FORM);
      setContactStatus("Brief sent. We will get back to you.");
    } catch {
      trackSiteEvent("contact_form_error", { projectType: contactForm.projectType });
      setContactStatus(`Could not send from the form. Please email ${CONTACT_EMAIL} or use WhatsApp.`);
    } finally {
      setIsContactSubmitting(false);
    }
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
      gradient: "from-[#ff9500] to-[#c86b00]",
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
      image: "/images/gal-magenta-v3.png",
    },
  ];

  const featuredProject: PortfolioProject = {
    id: "showreel",
    src: "/videos/showreel.mp4",
    poster: "/images/posters/showreel.jpg",
    title: "From Script to Soul",
    subtitle: "A glimpse to a 15 minutes short film crafted from a client's script, where written story becomes living cinema",
  };

  const portfolioProjects: PortfolioProject[] = [
    { id: "arlozorov", src: "/videos/arlozorov-final.mp4", poster: "/images/posters/arlozorov.jpg", title: "Who Killed Arlozorov", subtitle: "Educational Visual Experience" },
    { id: "ben-gurion", src: "/videos/ben-gurion-4-web.mp4", poster: "/images/posters/ben-gurion.jpg", title: "Ben-Gurion", subtitle: "Historical Character Study" },
    { id: "motion-graphics", src: "/videos/ai-6.mp4", poster: "/images/posters/motion-graphics.jpg", title: "Motion Graphics", subtitle: "Brand Animation" },
    { id: "animated-worlds", src: "/videos/ai-2.mp4", poster: "/images/posters/animated-worlds.jpg", title: "Animated Worlds Beyond Reality", subtitle: "AI Worldbuilding" },
    { id: "experimental-visuals", src: "/videos/ai-3.mp4", poster: "/images/posters/experimental-visuals.jpg", title: "Experimental Visual Experiences", subtitle: "Visual Innovation" },
    { id: "historical-reconstructions", src: "/videos/ai-5-audio.mp4", poster: "/images/posters/historical-reconstructions.jpg", title: "Historical Reconstructions", subtitle: "Visual Reenactments" },
    { id: "ai-storytelling", src: "/videos/ai-4.mp4", poster: "/images/posters/ai-storytelling.jpg", title: "AI Cinematic Storytelling", subtitle: "Generative Cinema" },
    { id: "creative-concepts", src: "/videos/ai-1.mp4", poster: "/images/posters/creative-concepts.jpg", title: "Creative Concepts", subtitle: "AI Visual Studies" },
  ];

  const renderProjectVideo = (project: PortfolioProject) => {
    const state = getProjectVideoState(project.id);
    const isLoaded = Boolean(loadedProjectVideos[project.id]);

    return (
      <div
        ref={setProjectVideoContainerRef(project.id)}
        className="relative aspect-video bg-black overflow-hidden"
      >
        <img
          src={project.poster}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={setProjectVideoRef(project.id)}
          src={isLoaded ? project.src : undefined}
          poster={project.poster}
          autoPlay={isLoaded}
          loop
          muted={state.isMuted}
          playsInline
          preload={isLoaded ? "metadata" : "none"}
          data-project-video={project.id}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-label={project.title}
          onPlay={() => updateProjectVideoState(project.id, { isPlaying: true })}
          onPause={() => updateProjectVideoState(project.id, { isPlaying: false })}
        >
          {CAPTIONS_ENABLED && project.captionSrc && (
            <track kind="captions" src={project.captionSrc} srcLang="en" label="English" />
          )}
        </video>

        <div className="absolute inset-x-0 bottom-0 z-20 p-3 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => void toggleProjectPlayback(project.id)}
              className="w-9 h-9 rounded-full border border-primary/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              aria-label={state.isPlaying ? `Pause ${project.title}` : `Play ${project.title}`}
            >
              {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => void toggleProjectSound(project.id)}
                className="w-9 h-9 rounded-full border border-primary/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                aria-label={state.isMuted ? `Unmute ${project.title}` : `Mute ${project.title}`}
              >
                {state.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={state.volume}
                onChange={(event) => handleProjectVolumeChange(project.id, event.target.value)}
                className="w-20 sm:w-24 accent-primary"
                aria-label={`Volume for ${project.title}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!mounted) return;

    if (!("IntersectionObserver" in window)) {
      setLoadedProjectVideos((current) => {
        const next = { ...current };
        Object.keys(projectVideoContainerRefs.current).forEach((id) => {
          next[id] = true;
        });
        return next;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-video-container");
          if (!id) return;
          markProjectVideoLoaded(id);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "700px 0px",
        threshold: 0.01,
      }
    );

    Object.entries(projectVideoContainerRefs.current).forEach(([id, element]) => {
      if (!element || loadedProjectVideos[id]) return;
      element.setAttribute("data-video-container", id);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [mounted, loadedProjectVideos]);

  useEffect(() => {
    if (!mounted) return;

    const frame = window.requestAnimationFrame(() => {
      Object.entries(projectVideoRefs.current).forEach(([id, video]) => {
        if (!video || !loadedProjectVideos[id]) return;

        video.muted = getProjectVideoState(id).isMuted;
        void video.play()
          .then(() => updateProjectVideoState(id, { isPlaying: true }))
          .catch(() => updateProjectVideoState(id, { isPlaying: false }));
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mounted, loadedProjectVideos]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">
      <audio
        ref={introSoundRef}
        src="/audio/intro-logo-sound.mp3"
        preload="auto"
        aria-hidden="true"
      />

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

          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="px-3 lg:px-4 py-2 rounded-full text-sm font-semibold text-primary/75 hover:text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Icons cluster: Mail + WhatsApp + Theme Toggle, all same size, equal spacing */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="Email us"
              onClick={() => trackSiteEvent("contact_click", { channel: "email_header" })}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              aria-label="WhatsApp"
              onClick={() => trackSiteEvent("contact_click", { channel: "whatsapp_header" })}
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
                onClick={() => scrollToSection("portfolio")}
              >
                View Our Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#3abfb5] text-[#3abfb5] hover:bg-[#3abfb5]/10 px-4 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-[0_0_15px_rgba(58,193,182,0.2)] hover:shadow-[0_0_25px_rgba(58,193,182,0.4)] transition-all duration-300 hover:scale-105 bg-transparent flex-1 sm:flex-initial"
                onClick={() => scrollToSection("contact")}
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
      <section id="portfolio" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden">
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
              {renderProjectVideo(featuredProject)}
              <CardContent className="p-6 relative z-10 bg-background/80 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-primary mb-2">{featuredProject.title}</h3>
                <p className="text-muted-foreground">{featuredProject.subtitle}</p>
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
                  {renderProjectVideo(project)}
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
      <section id="services" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 relative overflow-hidden bg-background">
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
                desc: "Led by one of the world's top music producers, our sound is more than audio - it's a voice. Each layer is composed to serve the story, stitched to its rhythm, and tailored to its emotional fabric. No templates. No stock. Just original, cinematic sound design made to fit - perfectly."
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

          <div className="mt-10 sm:mt-14 max-w-4xl mx-auto border border-primary/30 bg-primary/5 backdrop-blur-sm px-5 sm:px-8 py-6 sm:py-8 shadow-[0_0_20px_rgba(58,193,182,0.1)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="text-left">
                <p className="text-sm font-semibold text-primary/80 mb-2">
                  From brief to finished film
                </p>
                <h3 className="text-2xl font-bold text-primary">
                  A lean production path, built for cinematic outcomes.
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left lg:min-w-[28rem]">
                {["Brief", "Concept", "AI / Production", "Sound & Delivery"].map((step, index) => (
                  <div key={step} className="border-l border-primary/30 pl-3">
                    <span className="block text-xs font-semibold text-primary/70">
                      0{index + 1}
                    </span>
                    <span className="block text-sm sm:text-base font-semibold text-foreground">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Restored Hover Cards) */}
      <section id="team" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden">
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
      <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 relative bg-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary drop-shadow-lg font-display">
                Let's Create Magic
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl">
                Send us a script, brief, reference, or wild idea - we will shape it into a cinematic piece.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-start">
              <form
                onSubmit={handleContactSubmit}
                className="order-2 lg:order-1 border border-primary/25 bg-primary/5 backdrop-blur-sm p-5 sm:p-8 space-y-5 shadow-[0_0_20px_rgba(58,193,182,0.1)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-primary">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={contactForm.name}
                      onChange={(event) => updateContactField("name", event.target.value)}
                      autoComplete="name"
                      required
                      className="w-full bg-black/40 border border-primary/25 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-primary">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(event) => updateContactField("email", event.target.value)}
                      autoComplete="email"
                      required
                      className="w-full bg-black/40 border border-primary/25 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label htmlFor="contact-project-type" className="text-sm font-semibold text-primary">
                    Project type
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={contactForm.projectType}
                    onChange={(event) => updateContactField("projectType", event.target.value)}
                    className="w-full bg-black/40 border border-primary/25 px-4 py-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {projectTypeOptions.map((option) => (
                      <option key={option} value={option} className="bg-black text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 text-left">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-primary">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactForm.message}
                    onChange={(event) => updateContactField("message", event.target.value)}
                    required
                    rows={5}
                    className="w-full resize-y bg-black/40 border border-primary/25 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="Tell us what you want to make, what stage it is in, and any references you already have."
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isContactSubmitting}
                    className="bg-[#3abfb5] hover:bg-[#3abfb5] text-black font-bold px-6 py-6 rounded-full shadow-[0_0_20px_rgba(58,193,182,0.35)] hover:shadow-[0_0_30px_rgba(58,193,182,0.55)] transition-all duration-300 border-none disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isContactSubmitting ? "Sending..." : "Send Brief"}
                  </Button>
                  {contactStatus && (
                    <p className="text-sm text-muted-foreground" role="status">
                      {contactStatus}
                    </p>
                  )}
                </div>
              </form>

              <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={() => trackSiteEvent("contact_click", { channel: "email_card" })}
                >
                  <Card className="h-full bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                    <CardContent className="p-6 flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1 text-left min-w-0">
                        <h3 className="text-xl font-bold text-primary">Email Us</h3>
                        <span className="block text-muted-foreground group-hover:text-primary transition-colors text-sm break-all">
                          {CONTACT_EMAIL}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={() => trackSiteEvent("contact_click", { channel: "whatsapp_card" })}
                >
                  <Card className="h-full bg-primary/5 border-primary/30 backdrop-blur-sm hover:bg-primary/10 transition-all duration-500 group hover:-translate-y-1 shadow-[0_0_20px_rgba(58,193,182,0.1)] hover:shadow-[0_0_30px_rgba(58,193,182,0.3)]">
                    <CardContent className="p-6 flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1 text-left">
                        <h3 className="text-xl font-bold text-primary">WhatsApp</h3>
                        <span className="block text-muted-foreground group-hover:text-primary transition-colors text-sm">
                          Chat with us
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>
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
