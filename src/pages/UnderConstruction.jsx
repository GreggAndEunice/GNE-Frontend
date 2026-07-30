import { motion } from "framer-motion";
import { Construction, Hammer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlowOrbs from "../components/GlowOrbs";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0b12] px-6 py-12 text-white">
      {/* Background */}
      <GlowOrbs />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="
          relative
          z-10
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          p-8
          md:p-12
          backdrop-blur-2xl
          shadow-[0_25px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-pink-500/20 blur-[120px]" />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-pink-400/20 bg-gradient-to-br from-pink-500/10 to-purple-500/10"
        >
          <Construction size={52} className="text-pink-300" strokeWidth={1.7} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center text-4xl font-semibold md:text-6xl"
          style={{
            background:
              "linear-gradient(135deg,#fce7f3,#f9a8d4,#c084fc,#818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Under Construction
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-8 text-white/55 md:text-lg"
        >
          This section is still being carefully crafted. New features,
          animations, and experiences are currently under development and will
          be available soon.
        </motion.p>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            text-white/60
          "
        >
          <Hammer size={18} className="text-pink-300" />

          <span className="tracking-[0.25em] uppercase text-sm">
            Work in Progress
          </span>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-gradient-to-r
              from-pink-600
              to-purple-600
              px-6
              py-3
              text-sm
              font-medium
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(192,132,252,0.45)]
              cursor-pointer
            "
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1 "
            />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
