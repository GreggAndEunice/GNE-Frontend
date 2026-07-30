import React from "react";
import { motion } from "framer-motion";
import { sections } from "../../constants";
import { fadeUp } from "../../animations/variants";

const CARD_ACCENT_COLORS = [
  "from-rose-500/30 to-pink-600/20",
  "from-purple-500/30 to-indigo-600/20",
  "from-pink-400/30 to-rose-500/20",
  "from-violet-500/30 to-purple-600/20",
  "from-indigo-400/30 to-blue-600/20",
  "from-fuchsia-400/30 to-pink-600/20",
];

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const SectionTitle = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{
      once: true,
      amount: 0.3,
    }}
    className="
      relative
      z-10
      mb-20
      text-center
    "
  >
    <p
      className="
        mb-4
        text-xs
        uppercase
        tracking-[0.4em]
        text-rose-400/60
        font-serif
      "
    >
      a love letter in fragments
    </p>

    <h2
      className="
        bg-gradient-to-br
        from-pink-100
        via-pink-300
        to-purple-400
        bg-clip-text
        p-5
        text-3xl
        font-bold
        leading-tight
        text-transparent
        sm:text-5xl
      "
    >
      What You Are To Me
    </h2>

    <div
      className="
        mx-auto
        mt-6
        h-px
        w-32
        bg-gradient-to-r
        from-transparent
        via-pink-400/70
        to-transparent
      "
    />

    <p
      className="
        mx-auto
        mt-5
        max-w-md
        font-serif
        text-base
        italic
        leading-relaxed
        text-rose-100/40
      "
    >
      Not defined by one thing… but by everything you became to me
    </p>
  </motion.div>
);

const BadgeNumber = ({ index }) => (
  <div
    className="
      mb-3
      flex
      h-6
      w-6
      items-center
      justify-center
      rounded-full
      border
      border-rose-400/30
      bg-rose-500/10
      text-[10px]
      font-bold
      text-rose-300
    "
  >
    {String(index + 1).padStart(2, "0")}
  </div>
);

const Card = ({ item, index }) => {
  const accent = CARD_ACCENT_COLORS[index % CARD_ACCENT_COLORS.length];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-lg
        shadow-black/20
      "
    >
      {/* Image */}

      <div
        className="
          relative
          h-52
          overflow-hidden
        "
      >
        <img
          src={item.image}
          alt={item.title}
          className="
            h-full
            w-full
            rounded-3xl
            object-cover
            p-2
            transition
            duration-700
            ease-out
            group-hover:scale-110
          "
        />

        <div
          className={`
            absolute
            inset-0
            bg-gradient-to-t
            ${accent}
            opacity-60
          `}
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0b0b12]/90
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          p-6
          transition
          duration-300
          group-hover:-translate-y-1
        "
      >
        <BadgeNumber index={index} />

        <h2
          className="
            mb-2
            text-xl
            font-bold
            leading-snug
            text-white/90
          "
        >
          {item.title}
        </h2>

        <p
          className="
            font-serif
            text-sm
            italic
            leading-relaxed
            text-rose-100/45
          "
        >
          {item.text}
        </p>
      </div>

      {/* Hover shine */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-pink-400/70
          to-purple-400/70
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      />
    </motion.div>
  );
};

const WhatYouAreSection = () => (
  <section
    className="
      relative
      px-5
      py-28
    "
  >
    <SectionTitle />

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className="
        relative
        mx-auto
        grid
        max-w-6xl
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {sections.map((item, index) => (
        <Card key={index} item={item} index={index} />
      ))}
    </motion.div>
  </section>
);

export default WhatYouAreSection;
