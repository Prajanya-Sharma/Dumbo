'use client';

import { useEffect, useRef, useState } from 'react';

// Floating hearts canvas with enhanced visuals
function HeartsCanvas({ extra }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let hearts = [];
    let sparkles = [];

    const createHeart = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 15 + 8,
      speed: Math.random() * 0.8 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 1.5 - 0.75,
      pulse: Math.random() * Math.PI * 2,
    });

    const createSparkle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    });

    const init = () => {
      hearts = Array.from({ length: 25 + extra }, createHeart);
      sparkles = Array.from({ length: 40 }, createSparkle);
    };

    const drawHeart = (x, y, size, alpha) => {
      ctx.globalAlpha = alpha;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.6)');
      gradient.addColorStop(1, 'rgba(199, 21, 133, 0.3)');
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
      ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y);
      ctx.fill();
    };

    const drawSparkle = (x, y, size, alpha) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hearts.forEach((h) => {
        const pulsedSize = h.size + Math.sin(h.pulse) * 2;
        drawHeart(h.x, h.y, pulsedSize, h.alpha);
      });

      sparkles.forEach((s) => {
        const twinkleAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        drawSparkle(s.x, s.y, s.size, twinkleAlpha);
      });
    };

    const update = () => {
      hearts.forEach((h) => {
        h.y += h.speed;
        h.x += h.drift;
        h.pulse += 0.02;
        if (h.y > window.innerHeight + h.size) {
          h.y = -h.size;
          h.x = Math.random() * window.innerWidth;
        }
      });

      sparkles.forEach((s) => {
        s.y += s.speed;
        s.twinkle += 0.05;
        if (s.y > window.innerHeight + s.size) {
          s.y = -s.size;
          s.x = Math.random() * window.innerWidth;
        }
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [extra]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

// Enhanced song link with beautiful hover effects
function SongLink({ title, url, index }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-pink-300/40 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl"
      >
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
          <span className="text-lg">🎵</span>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-lg leading-tight group-hover:text-pink-200 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/60 text-sm">Click to listen</p>
        </div>
        <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-400/30 transition-all duration-300">
          <span className="text-white/70 text-sm group-hover:text-white">→</span>
        </div>
      </a>
    </div>
  );
}

// Ultra-sleek section with premium animations
function SongSection({ title, description, songs, onExpand, index }) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (!open) onExpand();
    setOpen((prev) => !prev);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 transition-all duration-700 blur-xl ${isHovered ? 'opacity-100' : ''}`}></div>
      
      <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-pink-500/10">
        {/* Header */}
        <div 
          onClick={handleToggle} 
          className="cursor-pointer p-8 transition-all duration-300 hover:bg-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-2xl">{title.split(' ')[0]}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                  {title.substring(2)}
                </h2>
                <p className="text-white/60 text-base mt-1">{description}</p>
              </div>
            </div>
            <div className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'rotate-180' : ''} hover:bg-white/20`}>
              <span className="text-white/70 text-xl">↓</span>
            </div>
          </div>
        </div>

        {/* Expandable content */}
        <div className={`overflow-hidden transition-all duration-700 ease-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
            <div className="space-y-3">
              {songs.map((song, i) => (
                <div key={i} style={{ animationDelay: `${i * 100}ms` }} className={`${open ? 'animate-fadeInUp' : ''}`}>
                  <SongLink {...song} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SongsPage() {
  const [extraHearts, setExtraHearts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleExpand = () => {
    setExtraHearts((prev) => prev + 15);
  };

  const sections = [
  {
    title: '💓 When I First Fell in Love with You',
    description: 'Songs that bring back butterflies and first moments',
    songs: [
      { title: 'Make you Mine', url: 'https://youtu.be/nLnp0tpZ0ok?list=RDnLnp0tpZ0ok' },
      { title: 'Teenage Dream', url: 'https://youtu.be/pVi9W3OThVw?list=RDnLnp0tpZ0ok' },
      { title: 'Afreen', url: 'https://youtu.be/h9urMVciJ10?list=RDh9urMVciJ10' },
      { title: 'Iraaday', url: 'https://youtu.be/ml17iL-wUZQ?list=RDMM' },
      { title: 'Farq Hai', url: 'https://youtu.be/dfCuMoiwN6M?list=RDMM' },
    ],
  },
  {
    title: '🌹 Our Time Together',
    description: 'Moments sealed in rhythm and melody',
    songs: [
      { title: 'Mast Magan', url: 'https://youtu.be/Cz7TfFrFojU?list=RDCz7TfFrFojU' },
      { title: 'You Are the Reason', url: 'https://youtu.be/BgmY2MkrY0I?list=RDBgmY2MkrY0I' },
      { title: 'I like me better', url: 'https://youtu.be/BcqxLCWn-CE?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'Stuck With You', url: 'https://youtu.be/h2jvHynuMjI?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'Timro Pratiksa', url: 'https://youtu.be/0_sZlZn8aLY' },
    ],
  },
  {
    title: '🌧️ Through Rainy Days',
    description: 'Even the sad songs were ours to share',
    songs: [
      { title: 'This Feeling', url: 'https://youtu.be/YuPzpoC3QNc?list=RDYuPzpoC3QNc' },
      { title: 'Little do you know', url: 'https://youtu.be/4bzIpYiPUUo?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'Its you', url: 'https://youtu.be/F-cO2CMue4Q?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'At my worst', url: 'https://youtu.be/K_zylJH4PRI?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'Rewrite the Stars', url: 'https://youtu.be/pRfmrE0ToTo?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
    ],
  },
  {
    title: '💖 Always & Forever',
    description: "Songs I'll love forever, just like you",
    songs: [
      { title: 'Deeper Than it Seems', url: 'https://youtu.be/29N8_pSsWCE?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA' },
      { title: 'Varoon', url: 'https://youtu.be/YEL7_7pkXUY?list=RDYEL7_7pkXUY' },
      { title: 'say you wont go', url: 'https://youtu.be/0yW7w8F2TVA?list=RD0yW7w8F2TVA' },
      { title: 'Ordinary', url: 'https://youtu.be/byxFUKxhT3s?t=135' },
      { title: 'Thousand Years', url: 'https://youtu.be/bjjC1-G6Fxo?list=RDbjjC1-G6Fxo' },
    ],
  },
];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <HeartsCanvas extra={extraHearts} />

      <div className="relative z-10 p-6 pb-32">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
            The Playlist of Us
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent w-24"></div>
            <span className="text-4xl">🎵</span>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-24"></div>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every song tells our story, every beat holds our memories
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {sections.map((sec, i) => (
            <div 
              key={i}
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              <SongSection {...sec} onExpand={handleExpand} index={i} />
            </div>
          ))}
        </div>

        {/* Footer message */}
        <div className={`text-center mt-20 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <p className="text-white/50 text-lg italic">
            "To our love story" 💕
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}