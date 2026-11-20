import React from "react";
import { motion } from "motion/react";
import { Mic, Volume2 } from "lucide-react";

interface SoundWaveProps {
  state: "idle" | "connecting" | "listening" | "speaking";
}

export const SoundWave: React.FC<SoundWaveProps> = ({ state }) => {
  // Wave bars for speaking animation
  const bars = Array.from({ length: 5 }, (_, i) => i);

  // Expanding circles for speaking/listening
  const circles = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div id="soundwave-container" className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Background radial glow */}
      <div
        id="bg-radial-glow"
        className={`absolute inset-0 rounded-full bg-gradient-to-tr transition-opacity duration-700 blur-3xl ${
          state === "idle"
            ? "from-rose-500/10 to-purple-500/10 opacity-40"
            : state === "connecting"
            ? "from-amber-500/20 to-pink-500/20 opacity-60 animate-pulse"
            : state === "listening"
            ? "from-emerald-400/25 to-teal-500/25 opacity-85"
            : "from-rose-500/40 via-purple-600/40 to-pink-500/40 opacity-100"
        }`}
      />

      {/* Concentric Static & Rotating Dashed Rings for Listening / Speaking */}
      {(state === "listening" || state === "speaking") && (
        <>
          <div
            className={`absolute w-64 h-64 rounded-full border transition-colors duration-500 ${
              state === "listening" ? "border-emerald-400/15" : "border-rose-400/20"
            }`}
          />
          <div
            className={`absolute w-52 h-52 rounded-full border transition-colors duration-500 ${
              state === "listening" ? "border-emerald-400/25" : "border-rose-400/30"
            }`}
          />
          <motion.div
            className={`absolute w-44 h-44 rounded-full border-[1.5px] border-dashed transition-colors duration-500 ${
              state === "listening" ? "border-emerald-400/50" : "border-rose-400/60"
            }`}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          />
        </>
      )}

      {/* Expanding Pulse Rings */}
      {(state === "speaking" || state === "listening") &&
        circles.map((index) => (
          <motion.div
            key={index}
            id={`ring-${index}`}
            className={`absolute rounded-full border ${
              state === "listening"
                ? "border-emerald-400/30"
                : "border-rose-400/40"
            }`}
            initial={{ width: 144, height: 144, opacity: 0.7 }}
            animate={{
              width: state === "speaking" ? 260 : 240,
              height: state === "speaking" ? 260 : 240,
              opacity: 0,
            }}
            transition={{
              repeat: Infinity,
              duration: state === "speaking" ? 1.6 : 2.6,
              delay: index * (state === "speaking" ? 0.5 : 0.85),
              ease: "easeOut",
            }}
          />
        ))}

      {/* Dynamic Sound Bars behind the core orb when speaking */}
      {state === "speaking" && (
        <div id="speaking-bars" className="absolute flex items-center justify-center space-x-2 z-0">
          {bars.map((bar) => (
            <motion.div
              key={bar}
              id={`bar-${bar}`}
              className="w-2 bg-gradient-to-t from-rose-500 to-purple-400 rounded-full opacity-60"
              initial={{ height: 40 }}
              animate={{
                height: [40, 140, 60, 160, 40],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + bar * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Central Core Avatar / Orb */}
      <motion.div
        id="core-orb-outer"
        className={`relative z-10 flex items-center justify-center w-36 h-36 rounded-full shadow-2xl border backdrop-blur-md transition-colors duration-500 ${
          state === "idle"
            ? "bg-slate-900/80 border-slate-500/60 shadow-slate-950"
            : state === "connecting"
            ? "bg-slate-900/90 border-amber-500/40 shadow-amber-500/10"
            : state === "listening"
            ? "bg-emerald-950/85 border-emerald-400/60 shadow-emerald-500/20"
            : "bg-gradient-to-tr from-rose-600/90 to-purple-700/90 border-rose-300/80 shadow-rose-500/40"
        }`}
        animate={
          state === "speaking"
            ? { scale: [1, 1.08, 0.98, 1.05, 1] }
            : state === "listening"
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: Infinity,
          duration: state === "speaking" ? 0.6 : 2,
          ease: "easeInOut",
        }}
      >
        {/* Core inner display */}
        <div id="core-orb-inner" className="flex flex-col items-center justify-center text-center p-4">
          {state === "idle" && (
            <span className="text-white text-3xl font-bold tracking-wider select-none">
              A
            </span>
          )}

          {state === "connecting" && (
            <div className="flex space-x-1.5 items-center">
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              />
            </div>
          )}

          {state === "listening" && (
            <motion.div
              className="flex flex-col items-center justify-center"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <Mic className="w-9 h-9 text-emerald-50 mb-2" strokeWidth={1.8} />
              <span className="text-emerald-100 text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                LISTENING
              </span>
            </motion.div>
          )}

          {state === "speaking" && (
            <motion.div className="flex flex-col items-center justify-center">
              <Volume2 className="w-8 h-8 text-white mb-1.5 animate-pulse" strokeWidth={1.8} />
              <span className="text-rose-100 text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                SPEAKING
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

