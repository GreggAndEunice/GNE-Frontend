import React from "react";
import { motion } from "framer-motion";

const GlowOrbs = () => {
  return (
    <div
      className="
    fixed
    inset-0
    z-0
    overflow-hidden
    pointer-events-none
  "
    >
      {/* Pink */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-pink-500/40
            blur-[150px]
          "
      />

      {/* Purple */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="
            absolute
            -right-40
            -bottom-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/40
            blur-[150px]
          "
      />

      {/* Fuchsia */}
      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="
            absolute
            left-1/4
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-fuchsia-500/15
            blur-[150px]
          "
      />

      {/* Extra subtle blob */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="
            absolute
            right-1/4
            bottom-20
            h-[350px]
            w-[350px]
            rounded-full
            bg-rose-400/10
            blur-[120px]
          "
      />
    </div>
  );
};

export default GlowOrbs;
