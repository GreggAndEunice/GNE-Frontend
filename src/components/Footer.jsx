import React from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

const START_DATE = new Date("2024-12-30");

const getTimeTogether = () => {
  const diff = Date.now() - START_DATE.getTime();

  const totalDays = Math.floor(diff / 86400000);

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  return {
    years,
    months,
    days,
    totalDays,
  };
};

const useCountUp = (target, startAnimation, duration = 5000) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!startAnimation) return;

    let start;
    let frame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [startAnimation, target, duration]);

  return value;
};

// Framer Motion variants

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
    scale: 0.6,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.7,
      delay,

      type: "spring",
      stiffness: 180,
      damping: 14,
    },
  }),
};

const StatPill = ({ value, label, sub, index }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    custom={0.8 + index * 0.1}
    viewport={{
      once: true,
    }}
    className="
      flex
      min-w-[110px]
      flex-col
      items-center
      rounded-2xl
      border
      border-pink-400/20
      bg-white/5
      px-6
      py-3
      backdrop-blur-md
    "
  >
    <span
      className="
        text-2xl
        font-bold
        text-white/90
        sm:text-3xl
      "
    >
      {value}
    </span>

    <span
      className="
        mt-1
        text-sm
        capitalize
        text-rose-300/70
        sm:text-base
      "
    >
      {label}
    </span>

    <span
      className="
        mt-1
        text-xs
        italic
        text-white/30
      "
    >
      {sub}
    </span>
  </motion.div>
);

const DotRow = () => (
  <div
    className="
      flex
      items-center
      gap-1.5
    "
  >
    {[3, 3, 6, 3, 3].map((size, index) => (
      <span
        key={index}
        className="
          rounded-full
          bg-pink-400/40
        "
        style={{
          width: size,
          height: size,
          boxShadow: index === 2 ? "0 0 8px rgba(244,114,182,.8)" : "none",

          background:
            index === 2 ? "rgba(244,114,182,.9)" : "rgba(244,114,182,.35)",
        }}
      />
    ))}
  </div>
);

const Footer = () => {
  const counterRef = React.useRef(null);

  const isCounterVisible = useInView(counterRef, {
    once: true,
    amount: 0.5,
  });

  const { years, months, days, totalDays } = getTimeTogether();

  const count = useCountUp(totalDays, isCounterVisible);

  const stats = [
    {
      value: years,
      label: years === 1 ? "year" : "years",
      sub: "of loving you",
    },

    {
      value: months,
      label: months === 1 ? "month" : "months",
      sub: "of growing closer",
    },

    {
      value: days,
      label: days === 1 ? "day" : "days",
      sub: "since last count",
    },
  ];

  return (
    <footer
      className="
        h-dvh
        relative
        overflow-hidden
        px-5
        pb-14
        pt-24
      "
    >
      {/* Ambient Background Orbs */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-rose-500/10
          blur-[90px]
        "
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[-5%]
          h-64
          w-64
          rounded-full
          bg-purple-600/10
          blur-[90px]
        "
      />
      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          right-[-5%]
          h-56
          w-56
          rounded-full
          bg-pink-500/10
          blur-[80px]
        "
      />

      {/* Divider */}
      <div
        className="
          relative
          mb-16
          flex
          items-center
          justify-center
          gap-4
        "
      >
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="
            h-px
            max-w-xs
            flex-1
            origin-right
          "
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(244,114,182,.5))",
          }}
        />

        <motion.div
          variants={scalePop}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Heart
            size={20}
            fill="rgba(244,114,182,.9)"
            stroke="rgba(244,114,182,.9)"
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="
            h-px
            max-w-xs
            flex-1
            origin-left
          "
          style={{
            background:
              "linear-gradient(90deg,rgba(244,114,182,.5),transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
          text-center
        "
      >
        {/* Quote */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.4}
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <p
            className="
              mb-2
              select-none
              text-6xl
              leading-none
              text-rose-100/25
            "
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            ❝
          </p>

          <p
            className="
              mx-auto
              max-w-lg
              text-white/70
              italic
            "
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",

              fontSize: "1.05rem",

              lineHeight: 1.8,
            }}
          >
            In all the world, there is no heart for me like yours. In all the
            world, there is no love for you like mine.
          </p>

          <p
            className="
              mt-3
              text-xs
              uppercase
              tracking-[0.35em]
              text-rose-400/50
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            — Maya Angelou
          </p>
        </motion.div>

        {/* Days Counter */}

        <motion.div
          ref={counterRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.6}
          viewport={{
            once: true,
          }}
          className="
            mb-4
            mt-14
          "
        >
          <p
            className="
              mb-3
              text-sm
              uppercase
              tracking-[0.4em]
              text-rose-400/50
            "
          >
            days we've shared
          </p>

          <span
            className="
              bg-gradient-to-br
              from-pink-100
              via-pink-300
              to-violet-400
              bg-clip-text
              text-5xl
              font-bold
              text-transparent
              sm:text-6xl
            "
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",

              lineHeight: 1,
            }}
          >
            {count.toLocaleString()}
          </span>
        </motion.div>

        {/* Stats */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            justify-center
            gap-3
          "
        >
          {stats.map((stat, index) => (
            <StatPill key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Signature */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.9}
          viewport={{
            once: true,
          }}
          className="
            mt-10
            flex
            flex-col
            items-center
            gap-3
            sm:mt-16
          "
        >
          <DotRow />

          <p
            className="
              text-center
              text-xs
              uppercase
              tracking-[0.35em]
              text-white/50
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            made with love, for you &amp; only you
          </p>

          <p
            className="
              text-xs
              tracking-widest
              text-white/40
            "
          >
            © {new Date().getFullYear()} · JGDEV
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
