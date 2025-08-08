"use client";
import { useEffect, useState } from "react";

export default function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [editedTexts, setEditedTexts] = useState({});

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);

    const textMap = {};
    data.forEach((note) => {
      textMap[note._id] = note.text;
    });
    setEditedTexts(textMap);
  };

  const addNote = async () => {
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ text: "" }),
      headers: { "Content-Type": "application/json" },
    });
    fetchNotes();
  };

  const updateNote = async (id, text, done) => {
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ text, done }),
      headers: { "Content-Type": "application/json" },
    });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)",
    "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
      {/* Animated floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Heart 1 */}
        <div className="absolute text-pink-300 text-2xl opacity-60 animate-bounce" style={{
          top: '10%',
          left: '15%',
          animationDelay: '0s',
          animationDuration: '3s'
        }}>💜</div>
        
        {/* Heart 2 */}
        <div className="absolute text-purple-300 text-3xl opacity-50" style={{
          top: '20%',
          right: '20%',
          animation: 'float 4s ease-in-out infinite',
          animationDelay: '1s'
        }}>💖</div>
        
        {/* Heart 3 */}
        <div className="absolute text-violet-300 text-xl opacity-70" style={{
          top: '60%',
          left: '10%',
          animation: 'float 3.5s ease-in-out infinite',
          animationDelay: '2s'
        }}>💕</div>
        
        {/* Heart 4 */}
        <div className="absolute text-pink-400 text-2xl opacity-40" style={{
          bottom: '20%',
          right: '15%',
          animation: 'pulse 2s ease-in-out infinite',
          animationDelay: '0.5s'
        }}>💝</div>
        
        {/* Heart 5 */}
        <div className="absolute text-purple-400 text-lg opacity-60" style={{
          top: '40%',
          left: '80%',
          animation: 'float 3s ease-in-out infinite reverse',
          animationDelay: '1.5s'
        }}>💗</div>
        
        {/* Heart 6 */}
        <div className="absolute text-violet-400 text-4xl opacity-30" style={{
          top: '70%',
          right: '60%',
          animation: 'bounce 4s ease-in-out infinite',
          animationDelay: '2.5s'
        }}>💙</div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-56 h-56 bg-violet-500 rounded-full blur-3xl" style={{
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-pink-500 rounded-full blur-3xl" style={{
          animation: 'float 5s ease-in-out infinite reverse'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header with hearts */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20">
                <span className="text-4xl animate-pulse">💜</span>
              </div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
              <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{animationDelay: '1s'}}>💖</div>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Birthday Yapping Notes
            </h1>
            <div className="flex items-center justify-center gap-2 text-purple-200 text-xl font-light tracking-wide">
              <span className="animate-pulse">💕</span>
              <span>Capture your heart Idiott</span>
              <span className="animate-pulse">💕</span>
            </div>
          </div>

          {/* Add button with heart */}
          <div className="flex justify-center mb-12">
            <button
              onClick={addNote}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-110 font-semibold text-lg border border-white border-opacity-20 backdrop-blur-sm"
            >
              <span className="flex items-center gap-4">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300 animate-pulse">💜</span>
                <span>Yapp away And Save For me</span>
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300 animate-pulse">✨</span>
              </span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Notes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {notes.map((note, i) => (
              <div
                key={note._id}
                className={`group relative rounded-3xl shadow-2xl hover:shadow-purple-500/30 p-6 min-h-[18rem] flex flex-col justify-between transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white border-opacity-20 backdrop-blur-lg ${
                  note.done 
                    ? "opacity-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20" 
                    : ""
                }`}
                style={{
                  background: note.done 
                    ? undefined 
                    : colors[i % colors.length],
                }}
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl"></div>

                {/* Floating heart on hover */}
                <div className="absolute -top-3 -right-3 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:animate-bounce">
                  💜
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <textarea
                    className="w-full bg-transparent h-40 resize-none outline-none text-lg font-medium text-black placeholder-white placeholder-opacity-70 leading-relaxed"
                    placeholder="Pour your heart out... 💜"
                    value={editedTexts[note._id] || ""}
                    onChange={(e) =>
                      setEditedTexts({
                        ...editedTexts,
                        [note._id]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Action buttons */}
                <div className="relative z-10 flex justify-between items-center mt-6 gap-3">
                  <button
                    onClick={() =>
                      updateNote(note._id, editedTexts[note._id], !note.done)
                    }
                    className={`flex items-center gap-3 text-sm font-bold px-5 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      note.done
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg hover:shadow-green-500/50"
                        : "bg-white bg-opacity-20 text-black hover:bg-opacity-30 shadow-lg hover:shadow-purple-500/30 backdrop-blur-sm border border-white border-opacity-30"
                    }`}
                  >
                    <span className="text-lg animate-pulse">{note.done ? "💚" : "🤍"}</span>
                    <span>{note.done ? "Loved" : "Mark Love"}</span>
                  </button>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="group/delete flex items-center gap-3 text-sm font-bold px-5 py-3 bg-white bg-opacity-20 text-red-300 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30 backdrop-blur-sm border border-white border-opacity-30 transform hover:scale-105"
                  >
                    <span className="text-lg group-hover/delete:animate-bounce">💔</span>
                    <span>Remove</span>
                  </button>
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-4 left-4 text-lg opacity-60 animate-pulse">✨</div>
                <div className="absolute bottom-4 right-4 text-sm opacity-40 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {notes.length === 0 && (
            <div className="text-center py-24">
              <div className="text-8xl mb-8 animate-bounce">💜</div>
              <h3 className="text-3xl font-bold text-purple-200 mb-4">
                Your heart is waiting...
              </h3>
              <p className="text-purple-300 text-xl">
                Create your first magical memory! ✨
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}