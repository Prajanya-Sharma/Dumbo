

"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// Enhanced hearts background with magical particles
function useHeartsBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let hearts = [];
    let particles = [];
    let stars = [];

    function createHeart() {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 18 + 8,
        speed: Math.random() * 0.8 + 0.3,
        alpha: Math.random() * 0.4 + 0.2,
        drift: Math.random() * 1.5 - 0.75,
        pulse: Math.random() * Math.PI * 2,
        hue: Math.random() * 60 + 300, // Pink to purple range
      };
    }

    function createParticle() {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      };
    }

    function createStar() {
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      };
    }

    function init() {
      hearts = Array.from({ length: 25 }, createHeart);
      particles = Array.from({ length: 35 }, createParticle);
      stars = Array.from({ length: 50 }, createStar);
    }

    function drawHeart(heart) {
      ctx.save();
      ctx.globalAlpha = heart.alpha * (0.8 + 0.2 * Math.sin(heart.pulse));
      
      const gradient = ctx.createRadialGradient(heart.x, heart.y, 0, heart.x, heart.y, heart.size);
      gradient.addColorStop(0, `hsla(${heart.hue}, 80%, 75%, 0.9)`);
      gradient.addColorStop(0.5, `hsla(${heart.hue}, 70%, 65%, 0.6)`);
      gradient.addColorStop(1, `hsla(${heart.hue}, 60%, 55%, 0.2)`);
      ctx.fillStyle = gradient;

      const size = heart.size + Math.sin(heart.pulse) * 2;
      ctx.beginPath();
      ctx.moveTo(heart.x, heart.y);
      ctx.bezierCurveTo(
        heart.x - size / 2, heart.y - size / 2,
        heart.x - size, heart.y + size / 3,
        heart.x, heart.y + size
      );
      ctx.bezierCurveTo(
        heart.x + size, heart.y + size / 3,
        heart.x + size / 2, heart.y - size / 2,
        heart.x, heart.y
      );
      ctx.fill();
      ctx.restore();
    }

    function drawParticle(particle) {
      ctx.save();
      ctx.globalAlpha = particle.alpha * (0.5 + 0.5 * Math.sin(particle.twinkle));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawStar(star) {
      ctx.save();
      ctx.globalAlpha = star.alpha * (0.3 + 0.7 * Math.sin(star.twinkle));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(drawStar);
      particles.forEach(drawParticle);
      hearts.forEach(drawHeart);
    }

    function update() {
      hearts.forEach((heart) => {
        heart.y += heart.speed;
        heart.x += heart.drift;
        heart.pulse += 0.02;
        if (heart.y > window.innerHeight + heart.size) {
          Object.assign(heart, createHeart());
          heart.y = -heart.size;
        }
      });

      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.twinkle += 0.05;
        if (particle.y > window.innerHeight + particle.size) {
          Object.assign(particle, createParticle());
          particle.y = -particle.size;
        }
      });

      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed;
      });
    }

    function animate() {
      draw();
      update();
      requestAnimationFrame(animate);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    
    return () => window.removeEventListener("resize", resize);
  },[]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

// Enhanced confetti function
const triggerMagicalConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 140,
    origin: { y: 0.7 },
  });
};

export default function BirthdayPage() {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const cards = [
    {
      title: "🌸 Flower Garden",
      href: "/birthday/flower-garden",
      desc: "Click the buds and see them bloom with love",
      gradient: "from-pink-400/20 to-rose-500/30",
      hoverGradient: "from-pink-500/30 to-rose-600/40",
      icon: "🌸",
    },
    {
      title: "🎵 Our Songs",
      href: "/birthday/songs", 
      desc: "Songs for every moment we've shared",
      gradient: "from-purple-400/20 to-pink-500/30",
      hoverGradient: "from-purple-500/30 to-pink-600/40",
      icon: "🎵",
    },
    {
      title: "📓 Notebook",
      href: "/birthday/notebook",
      desc: "A book filled with little notes for you",
      gradient: "from-indigo-400/20 to-purple-500/30", 
      hoverGradient: "from-indigo-500/30 to-purple-600/40",
      icon: "📓",
    },
    {
      title:"Yap All You want Meri Jaan",
      href: "#",
      onClick: () => setShowOTPModal(true),
      desc: "Just a cute space for my dumbo 🐷",
      gradient: "from-rose-400/20 to-pink-500/30",
      hoverGradient: "from-rose-500/30 to-pink-600/40", 
      icon: "🎮",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {useHeartsBackground()}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        {/* Main Title */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center text-3xl sm:text-5xl md:text-6xl font-extrabold text-center drop-shadow z-10 leading-tight mb-4">
            {Array.from("🎉 Happy Birthday Dumbo 💖").map((char, idx) => (
              <span
                key={idx}
                className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  animationDelay: `${idx * 60}ms`,
                  animation: isLoaded ? 'bounceIn 0.6s ease-out forwards' : 'none'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent w-20"></div>
            <span className="text-3xl">✨</span>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent w-20"></div>
          </div>
          
          <p className={`text-base sm:text-lg md:text-xl text-white/80 max-w-md mx-auto leading-relaxed transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '300ms'}}>
            Here's something special just for you 🥹💌
          </p>
        </div>

        {/* Magic Button */}
        <div className={`mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '600ms'}}>
          <button
            onClick={triggerMagicalConfetti}
            className="group relative px-6 py-3 bg-gradient-to-r from-pink-500/30 to-purple-600/40 backdrop-blur-md hover:from-pink-500/40 hover:to-purple-600/50 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20 text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              Click Me for Magic 🎊
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 max-w-4xl w-full px-2">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${900 + i * 150}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${card.hoverGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}></div>
              
              <div
                onClick={card.onClick || (() => (window.location.href = card.href))}
                className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.05] active:scale-[0.97] overflow-hidden`}
              >
                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-200 transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400/50 to-purple-400/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer message */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1500ms' }}>
          <p className="text-white/60 text-lg italic">
            "Every moment with you is a celebration" 💕
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && <OTPModal onClose={() => setShowOTPModal(false)} />}

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(30px) rotate(-15deg) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) rotate(5deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced OTP Modal
function OTPModal({ onClose }) {
  const [step, setStep] = useState("input-email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("enter-otp");
        setStatus("OTP sent! Check your email 💌");
      } else {
        setStatus(data.error || "Failed to send OTP");
      }
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Verified! Redirecting...");
        setTimeout(() => {
          window.location.href = "/birthday/game";
        }, 1000);
      } else {
        setStatus(data.error || "Invalid OTP");
      }
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 w-full max-w-sm overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl opacity-50 blur-xl"></div>
        
        <div className="relative p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Access Required
            </h3>
            <p className="text-white/70 mt-2">Enter your details to continue</p>
          </div>

          {step === "input-email" && (
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 text-white placeholder-white/50 transition-all duration-300"
                />
              </div>
              <button
                onClick={sendOTP}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500/30 to-purple-600/40 backdrop-blur-md text-white py-4 rounded-xl font-semibold hover:from-pink-500/40 hover:to-purple-600/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/20 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  "Send OTP ✨"
                )}
              </button>
            </div>
          )}

          {step === "enter-otp" && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-white/80 text-sm">
                  OTP sent to <span className="font-semibold text-pink-300">{email}</span>
                </p>
              </div>
              <div>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 text-white placeholder-white/50 transition-all duration-300 text-center tracking-widest"
                />
              </div>
              <button
                onClick={verify}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500/30 to-purple-600/40 backdrop-blur-md text-white py-4 rounded-xl font-semibold hover:from-pink-500/40 hover:to-purple-600/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/20 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP 🔓"
                )}
              </button>
            </div>
          )}

          {status && (
            <div className="text-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-sm text-white/90">{status}</p>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="w-full text-white/60 hover:text-white/90 text-sm transition-colors duration-300 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}