"use client";
import React, { useState, useRef, use } from 'react';

function HeartsCanvas({ count = 40 }) {
  const canvasRef = useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let hearts = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      hearts = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 8,
        speed: Math.random() * 0.8 + 0.3,
        alpha: Math.random() * 0.4 + 0.3,
        drift: Math.random() * 1.5 - 0.75,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((h) => {
        ctx.globalAlpha = h.alpha;
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.moveTo(h.x, h.y);
        ctx.bezierCurveTo(
          h.x - h.size / 2,
          h.y - h.size / 2,
          h.x - h.size,
          h.y + h.size / 3,
          h.x,
          h.y + h.size
        );
        ctx.bezierCurveTo(
          h.x + h.size,
          h.y + h.size / 3,
          h.x + h.size / 2,
          h.y - h.size / 2,
          h.x,
          h.y
        );
        ctx.fill();
      });
    };

    const update = () => {
      hearts.forEach((h) => {
        h.y += h.speed;
        h.x += h.drift;
        if (h.y > canvas.height) {
          h.y = -h.size;
          h.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
}

const pages = [
  {
    title: "Chapter I",
    subtitle: "To The Love of My Life",
    content: "I reaally dont remember when i started to be like ki damn i like her like i was always very reserved egoistic even i would say but i didnt even know when my heart was like noo you like her"
  },
  {
    title: "Chapter II", 
    subtitle: "The Discovery",
    content: "And then it was like oh no you dont like like her its just teenage thingy i was basically trying to deny with my head what my heart was telling me i dont even know why i was just a kind who tried to denied something so obvious"
  },
  {
    title: "Chapter III",
    subtitle: "The Easing In",
    content: "But then i was like no i really do like her i think it was the incident when you went away to your home we were making fun of you for maths and i came to your door and i was like sorry me? i? how can i be sorry ? but i was...."
  },
  {
    title: "Chapter IV",
    subtitle: "My Tries",
    content: "Bruhh tujhe mnane ke liye i was like oh do you like some guy do you like this like that you must like someone to and i so dearly wished that someone was me, jab bhi you were like bro bruh my heart wrenched par fir somedays would be buh uh she defo likes me"
  },
  {
    title: "Chapter V",
    subtitle: "Finally Together",
    content: "And then you finally said yes i do slowly hinting me that oh it might be the lucky me and then came the best of my life ever when i was likee fuckkkk i said i likee you i just went awayyy buttt hehe i got the cutest reply in return and it madde me the happiest person"
  },
  {
    title: "Chapter VI",
    subtitle: "The Ups and Downs",
    content: "We had the most amazing times possible anyone could ever ever fanthom but we had the hardest roughest breaks to that were not in out control but i would want to live it again nothing else could tell me more than those times that we were meant for each other"
  },
  {
    title: "Chapter VII",
    subtitle: "The Distance",
    content: "We had the sweetest and the sexiest moments together and then finally came the distance. Yk everyone ever said that nhi chalta itna lmba long distance between two time zones but i didnt say a word at that time cause i beleived in us so so much and i knew i wouldnt need to ever worry or answer anyone i just knew we were the best"
  },
  {
    title: "Chapter VIII",
    subtitle: "The Now and Forever ",
    content: "Finally no matter what happens all i know is I found the best Person for me I could ever ask We started as strangers and never in a 100 lifes i would have imagined i would be so vulnerable to a !Stranger! and here i am now before you and I just want to say that I love you so so Much meri Jaannnn"
  }
];

export default function VintageFlipBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      <HeartsCanvas />
      
      {/* Vintage texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 90%, rgba(101, 67, 33, 0.25) 0%, transparent 50%)
          `,
          zIndex: 1
        }}
      />

      <div className="relative z-10 max-w-2xl w-full">
        {/* Book Container */}
        <div className="relative mx-auto" style={{ width: '500px', height: '650px' }}>
          
          {/* Book Shadow */}
          <div 
            className="absolute inset-0 bg-black opacity-30 blur-xl transform translate-y-8 translate-x-4"
            style={{ zIndex: -1 }}
          />
          
          {/* Book Cover/Page */}
          <div 
            className={`
              absolute inset-0 rounded-lg transform-gpu transition-all duration-300 ease-in-out
              ${isFlipping ? 'rotateY-12 scale-95' : 'rotateY-0 scale-100'}
            `}
            style={{
              background: `
                linear-gradient(135deg, 
                  #8B4513 0%, 
                  #A0522D 25%, 
                  #654321 50%, 
                  #8B4513 75%, 
                  #5D4037 100%
                )
              `,
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(139, 69, 19, 0.8) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(101, 67, 33, 0.6) 0%, transparent 50%),
                linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.1) 50%, transparent 51%)
              `,
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.4),
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 4px rgba(0,0,0,0.3)
              `,
              border: '3px solid #654321',
              borderRadius: '12px'
            }}
          >
            
            {/* Page Content */}
            <div className="h-full p-12 flex flex-col justify-between relative overflow-hidden">
              
              {/* Paper texture */}
              <div 
                className="absolute inset-4 opacity-80 rounded-lg"
                style={{
                  background: '#F4F1E8',
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 24px,
                      rgba(139, 69, 19, 0.1) 25px
                    ),
                    radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.03) 0%, transparent 50%)
                  `,
                  boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.1)'
                }}
              />
              
              {/* Page content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="text-center mb-8">
                  <h1 
                    className="text-4xl font-bold mb-2 text-amber-900"
                    style={{ 
                      fontFamily: 'serif',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      filter: 'sepia(20%)'
                    }}
                  >
                    {pages[currentPage].title}
                  </h1>
                  <h2 
                    className="text-xl italic text-amber-700 opacity-80"
                    style={{ fontFamily: 'serif' }}
                  >
                    {pages[currentPage].subtitle}
                  </h2>
                </div>
                
                <div className="flex-1 flex items-center">
                  <p 
                    className="text-lg leading-relaxed text-amber-900 text-justify"
                    style={{ 
                      fontFamily: 'serif',
                      textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.05)',
                      filter: 'sepia(10%)'
                    }}
                  >
                    {pages[currentPage].content}
                  </p>
                </div>
                
                {/* Page number */}
                <div className="text-center mt-8">
                  <span 
                    className="text-sm text-amber-700 opacity-70"
                    style={{ fontFamily: 'serif' }}
                  >
                    ~ {currentPage + 1} ~
                  </span>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-800 opacity-30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-800 opacity-30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-800 opacity-30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-800 opacity-30 rounded-br-lg" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className={`
              px-6 py-3 rounded-lg font-serif text-lg transition-all duration-200
              ${currentPage === 0 || isFlipping
                ? 'bg-amber-900 bg-opacity-30 text-amber-300 cursor-not-allowed'
                : 'bg-amber-800 text-amber-100 hover:bg-amber-700 hover:scale-105 active:scale-95 shadow-lg'
              }
            `}
            style={{
              boxShadow: currentPage === 0 || isFlipping 
                ? 'none' 
                : '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)'
            }}
          >
            ← Previous
          </button>
          
          <div className="text-amber-100 font-serif">
            Page {currentPage + 1} of {pages.length}
          </div>
          
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1 || isFlipping}
            className={`
              px-6 py-3 rounded-lg font-serif text-lg transition-all duration-200
              ${currentPage === pages.length - 1 || isFlipping
                ? 'bg-amber-900 bg-opacity-30 text-amber-300 cursor-not-allowed'
                : 'bg-amber-800 text-amber-100 hover:bg-amber-700 hover:scale-105 active:scale-95 shadow-lg'
              }
            `}
            style={{
              boxShadow: currentPage === pages.length - 1 || isFlipping 
                ? 'none' 
                : '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)'
            }}
          >
            Next →
          </button>
        </div>
      </div>

      <style jsx>{`
        .rotateY-12 {
          transform: perspective(1000px) rotateY(12deg);
        }
        .rotateY-0 {
          transform: perspective(1000px) rotateY(0deg);
        }
      `}</style>
    </div>
  );
}