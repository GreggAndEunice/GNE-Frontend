import React, { useState } from "react";
import { Heart, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../animations/variants";

const VIDEOS = [
  {
    src: "/videos/homepage/We.mp4",
    label: "Us, Always",
    subtext: "even thru the storms",
  },
  {
    src: "/videos/homepage/We2.mp4",
    label: "My love",
    subtext: "every single day",
  },
  {
    src: "/videos/homepage/We3.mp4",
    label: "Forever & Ever",
    subtext: "into infinity",
  },
  {
    src: "/videos/homepage/We4.mp4",
    label: "Always you",
    subtext: "every heartbeat",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const VideoCard = ({ video, onClick }) => {
  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      whileHover={{
        scale: 1.04,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        cursor-pointer
        border
        border-white/10
        bg-white/5
        shadow-lg
      "
    >
      <video
        src={video.src}
        muted
        autoPlay
        loop
        playsInline
        className="
          h-[220px]
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
        "
      />

      {/* Dark gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/70
          via-transparent
          to-transparent
        "
      />

      {/* Hover glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-pink-500/20
          to-violet-500/20
          opacity-0
          transition
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Play */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/20
          opacity-0
          backdrop-blur
          transition
          duration-300
          group-hover:opacity-100
        "
      >
        <Play size={18} fill="white" className="text-white" />
      </div>

      {/* Text */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-4
        "
      >
        <p
          className="
            font-serif
            text-sm
            font-semibold
            text-white/90
          "
        >
          {video.label}
        </p>

        <p
          className="
            mt-1
            text-xs
            italic
            text-white/40
          "
        >
          {video.subtext}
        </p>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ src, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/90
          p-5
          backdrop-blur-md
        "
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{
            scale: 0.9,
          }}
          animate={{
            scale: 1,
          }}
          className="
            w-full
            max-w-3xl
          "
        >
          <video
            src={src}
            controls
            autoPlay
            className="
              w-full
              rounded-2xl
            "
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        px-5
        py-24
      "
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          relative
          z-10
          w-full
          max-w-5xl
          text-center
        "
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="
            mx-auto
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-rose-300/30
            bg-rose-500/10
            px-5
            py-2
            text-xs
            uppercase
            tracking-[0.25em]
            text-rose-200
          "
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
            }}
          >
            <Heart size={14} />
          </motion.span>
          our story
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="
            font-serif
            text-5xl
            font-bold
            leading-none
            pb-4
            text-purple-200
            md:text-7xl
          "
        >
          Hey Babe,
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="
            mx-auto
            mt-6
            max-w-xl
            font-serif
            text-lg
            italic
            leading-relaxed
            text-rose-100/50
          "
        >
          I turned our memories into something you can see, feel, and revisit
          anytime… because loving you is my favorite story to tell.
        </motion.p>

        <motion.div
          variants={container}
          className="
            mt-14
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {VIDEOS.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              onClick={() => setActiveVideo(video.src)}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="
            mt-12
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <div
            className="
              h-10
              w-px
              bg-gradient-to-b
              from-rose-400/50
              to-transparent
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-rose-300/40
            "
          >
            scroll
          </span>
        </motion.div>
      </motion.div>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
};

export default HeroSection;
