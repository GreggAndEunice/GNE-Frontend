import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import GlowOrbs from "./GlowOrbs";

import "swiper/css";

import { firsts } from "../constants";

const SERIF = "'Cormorant Garamond', Georgia, serif";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

const scalePop = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 180,
      damping: 18,
    },
  },
};

const TILTS = [-2.5, 1.8, -1.2, 2.1, -1.8, 1.4, -2.2, 1.6];

// ─────────────────────────────────────────
// Memory Card
// ─────────────────────────────────────────

const MemoryCard = ({ item, index, onClick }) => {
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.div
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 40,
        rotate: tilt,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: tilt,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.04,
        y: -8,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        group
        cursor-pointer
        select-none
      "
      style={{
        width: "240px",
      }}
    >
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-2
          pb-10
          shadow-xl
          backdrop-blur-xl
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <motion.img
            src={item.image}
            alt={item.text}
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              h-[260px]
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-purple-500/10
              to-transparent
            "
          />
        </div>

        <div
          className="
            pt-3
            text-center
          "
        >
          <p
            className="
              text-sm
              italic
              tracking-wider
              text-pink-400/70
            "
            style={{
              fontFamily: SERIF,
            }}
          >
            {item.date}
          </p>

          <p
            className="
              text-base
              font-medium
              leading-snug
              text-white/80
            "
            style={{
              fontFamily: SERIF,
            }}
          >
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────
// Memory Modal
// ─────────────────────────────────────────

const MemoryModal = ({ item, onClose }) => (
  <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      duration: 0.3,
    }}
    onClick={onClose}
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      p-4
      backdrop-blur-xl
    "
  >
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
      }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
      onClick={(e) => e.stopPropagation()}
      className="
        w-full
        max-w-md
        overflow-hidden
        rounded-3xl
        border
        border-pink-400/20
        bg-[#120e20]/95
        shadow-2xl
      "
    >
      {/* Image */}

      <div
        className="
          relative
        "
      >
        <img
          src={item.image}
          alt={item.text}
          className="
            h-[300px]
            w-full
            object-cover
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#120e20]
            via-transparent
            to-transparent
          "
        />

        <p
          className="
            absolute
            bottom-5
            left-5
            text-xs
            italic
            tracking-widest
            text-pink-300/80
          "
          style={{
            fontFamily: SERIF,
          }}
        >
          {item.date}
        </p>
      </div>

      {/* Content */}

      <div
        className="
          px-6
          pb-8
          pt-5
        "
      >
        <div
          className="
            mb-4
            h-px
            w-10
            bg-gradient-to-r
            from-pink-400
            to-transparent
          "
        />

        <h2
          className="
            mb-3
            text-2xl
            font-semibold
            text-white/90
          "
          style={{
            fontFamily: SERIF,
          }}
        >
          {item.text}
        </h2>

        <p
          className="
            text-base
            italic
            leading-relaxed
            text-white/50
          "
          style={{
            fontFamily: SERIF,
          }}
        >
          {item.description}
        </p>

        <p
          className="
            mt-5
            text-right
            text-4xl
            text-pink-400/20
          "
          style={{
            fontFamily: SERIF,
          }}
        >
          ❝
        </p>
      </div>
    </motion.div>
  </motion.div>
);

// ─────────────────────────────────────────
// Beginning Header
// ─────────────────────────────────────────

const BeginningHeader = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{
      once: true,
    }}
    custom={0}
    className="
      mx-auto
      max-w-3xl
      px-6
      pb-6
      pt-10
      text-center
    "
  >
    <p
      className="
        mb-4
        text-xs
        uppercase
        tracking-[0.3em]
        text-pink-400/60
        italic
        font-serif
      "
    >
      our firsts
    </p>

    <h2
      className="
        bg-gradient-to-br
        from-pink-100
        via-pink-300
        to-violet-400
        bg-clip-text
        text-4xl
        font-bold
        py-3
        text-transparent
        sm:text-5xl
      "
    >
      Where It All Began
    </h2>

    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      custom={0.15}
      className="
        mt-4
        text-base
        italic
        text-white/40
        font-serif
      "
    >
      The little moments that quietly became everything
    </motion.p>

    {/* Divider */}

    <motion.div
      initial={{
        opacity: 0,
        scaleX: 0,
      }}
      whileInView={{
        opacity: 1,
        scaleX: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 1,
        delay: 0.25,
      }}
      className="
        mx-auto
        mt-8
        flex
        max-w-[180px]
        items-center
        gap-3
      "
    >
      <div
        className="
          h-px
          flex-1
          bg-gradient-to-r
          from-transparent
          to-pink-400/40
        "
      />

      <span
        className="
          text-sm
          text-pink-400/60
        "
      >
        ✦
      </span>

      <div
        className="
          h-px
          flex-1
          bg-gradient-to-l
          from-transparent
          to-pink-400/40
        "
      />
    </motion.div>
  </motion.div>
);

const Beginning = () => {
  const [selected, setSelected] = React.useState(null);

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#09090f]
    "
    >
      {/* Global Ambient Background */}
      <GlowOrbs />

      <section
        className="
    relative
    z-10
    min-h-screen
    overflow-hidden
    bg-transparent
    text-white
  "
      >
        {/* Header */}

        <BeginningHeader />

        {/* Swiper */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            py-8
            pb-16
          "
        >
          <Swiper
            slidesPerView="auto"
            centeredSlides
            spaceBetween={24}
            grabCursor
            modules={[Autoplay]}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
          >
            {firsts.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "auto",
                }}
              >
                <div
                  className="
                      px-2
                      py-8
                    "
                  style={{
                    width: 240,
                  }}
                >
                  <MemoryCard
                    item={item}
                    index={index}
                    onClick={() => setSelected(item)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Modal */}

      <AnimatePresence>
        {selected && (
          <MemoryModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Beginning;
