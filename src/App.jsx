import React, { useState, useEffect } from 'react';
import gamesData from './data/games.json';
import { Gamepad2, X, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveGame(null);
    };
    if (activeGame) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FF00] selection:text-black font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00FF00] rounded-xl flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform">
              <Gamepad2 className="text-zinc-950 w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-white hover:text-[#00FF00] transition-colors">
              Goober Games
            </h1>
          </div>
          <nav className="hidden sm:flex gap-6">
            <a href="#" className="font-sans text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-[#00FF00] transition-colors">Arcade</a>
            <a href="#" className="font-sans text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-[#00FF00] transition-colors">Leaderboard</a>
            <a href="#" className="font-sans text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-[#00FF00] transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="mb-16">
          <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-600 uppercase">
             Ready to<br />Play?
          </h2>
          <p className="max-w-xl text-zinc-400 font-sans text-lg md:text-xl">
             Select a game from the arcade below. Fully unblocked, always accessible, and ready for action.
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gamesData.map((game) => (
            <div
              key={game.id}
              onClick={() => setActiveGame(game)}
              className="group cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-[#00FF00] transition-colors flex flex-col h-full shadow-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.15)]"
            >
              <div className="relative aspect-video overflow-hidden bg-zinc-800 border-b-2 border-zinc-800 group-hover:border-[#00FF00] transition-colors">
                <img 
                  src={game.thumbnail} 
                  alt={game.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#00FF00] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,0,0.5)] scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-black ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl mb-2 tracking-tight group-hover:text-[#00FF00] transition-colors">{game.title}</h3>
                <p className="text-zinc-400 font-sans text-sm line-clamp-2 leading-relaxed flex-1">{game.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Game Modal Overlay */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md p-4 md:p-6 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full max-w-7xl max-h-[900px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            >
              {/* Modal Header */}
              <div className="h-16 flex items-center justify-between px-6 bg-zinc-900 border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-[#00FF00] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                     <Gamepad2 className="w-5 h-5 text-black" />
                   </div>
                   <h2 className="font-display font-bold text-xl uppercase tracking-tight text-white">{activeGame.title}</h2>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-zinc-400 group border border-transparent hover:border-red-500/50"
                  aria-label="Close Game"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Game Iframe Wrapper */}
              <div className="flex-1 w-full bg-black relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-700 font-display animate-pulse uppercase tracking-widest text-sm">Loading Game...</span>
                 </div>
                 <iframe 
                   src={activeGame.url} 
                   title={activeGame.title}
                   className="absolute inset-0 w-full h-full border-0 z-10"
                   allow="autoplay; fullscreen; gamepad"
                   sandbox="allow-scripts allow-same-origin"
                 ></iframe>
              </div>
              
              {/* Modal Footer / Info */}
              <div className="h-14 bg-zinc-900 border-t border-zinc-800 flex items-center px-6 text-sm text-zinc-400 font-sans gap-3 shrink-0">
                 <Info className="w-4 h-4 text-[#00FF00] shrink-0" />
                 <p className="truncate mr-4">{activeGame.description}</p>
                 <div className="ml-auto hidden sm:flex items-center gap-2 text-zinc-500 shrink-0">
                    <span>Press</span>
                    <kbd className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300">ESC</kbd>
                    <span>to close</span>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
