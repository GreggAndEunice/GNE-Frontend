import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LazyImage } from "./LazyImage.jsx";
import { monthName } from "../lib/groupByMonth.js";

const ACCENT_COLORS = [
  ["rgba(244,63,94,0.35)", "rgba(124,58,237,0.2)"],
  ["rgba(124,58,237,0.35)", "rgba(236,72,153,0.2)"],
  ["rgba(236,72,153,0.35)", "rgba(79,70,229,0.2)"],
  ["rgba(79,70,229,0.35)", "rgba(244,63,94,0.2)"],
];

export const GroupCard = ({ group, basePath, index = 0 }) => {
  const [a, b] = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.45,
      }}
    >
      <Link
        to={`${basePath}/${group.year}/${group.month}`}
        className="
          group
          relative
          block
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.035]
          backdrop-blur-xl
          shadow-2xl
          shadow-black/30
        "
      >
        {/* Ghost Chapter Number */}

        <span
          className="
            absolute
            right-4
            top-[-20px]
            z-0
            text-[90px]
            font-bold
            text-pink-400/[0.06]
            select-none
            font-serif
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Image */}

        <div
          className="
            relative
            h-48
            overflow-hidden
          "
        >
          {group.thumbnail ? (
            <LazyImage
              src={group.thumbnail}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    ${a},
                    ${b}
                  )
                `,
              }}
            >
              <span
                className="
                  text-4xl
                  opacity-20
                "
              >
                ✦
              </span>
            </div>
          )}

          {/* Color overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-pink-500/30
              via-transparent
              to-transparent
            "
          />

          {/* Bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-34
              bg-gradient-to-t
              from-[#09090f]
              to-transparent
            "
          />

          {/* Count */}

          <div
            className="
              absolute
              right-3
              top-3

              rounded-full

              border
              border-white/10

              bg-black/40

              px-3
              py-1

              text-xs
              text-white/60

              backdrop-blur-xl
              font-serif
            "
          >
            {group.items.length}{" "}
            {group.items.length === 1 ? "memory" : "memories"}
          </div>
        </div>

        {/* Content */}

        <div
          className="
            relative
            z-10
            p-5
          "
        >
          {/* Year */}

          <div
            className="
              mb-2
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                h-px
                w-6
                bg-gradient-to-r
                from-pink-400/60
                to-transparent
              "
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-pink-300/50
                font-serif
              "
            >
              {group.year}
            </span>
          </div>

          {/* Month */}

          <h2
            className="
              text-2xl
              font-bold
              text-white/90
              font-serif
            "
          >
            {monthName(group.month)}
          </h2>

          {/* Divider */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                h-px
                w-8
                bg-pink-400/30
              "
            />

            <span
              className="
                text-xs
                text-pink-300/40
              "
            >
              ✦
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
