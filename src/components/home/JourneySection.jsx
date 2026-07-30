import { motion } from "framer-motion";
import { journey } from "../../constants";
import {
  fadeUp,
  fromLeft,
  fromRight,
  pop,
  line,
  connector,
} from "../../animations/variants";

const SERIF = "'Cormorant Garamond', serif";

const TITLE_GRADIENT =
  "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #c084fc 80%, #818cf8 100%)";

const SectionTitle = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    className="relative z-10 mb-24 text-center"
  >
    <p
      className="mb-4 text-xs uppercase tracking-[0.4em] text-rose-400/60"
      style={{ fontFamily: SERIF }}
    >
      chapter by chapter
    </p>

    <h2
      className="p-4 text-4xl font-bold leading-tight sm:text-6xl"
      style={{
        background: TITLE_GRADIENT,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Our Story
    </h2>

    <motion.div
      variants={line}
      className="mx-auto mt-6 h-px w-32 origin-center bg-gradient-to-r from-transparent via-pink-400/70 to-transparent"
    />

    <p
      className="mx-auto mt-5 max-w-md text-rose-100/40 italic leading-relaxed"
      style={{
        fontFamily: SERIF,
        fontSize: "1.05rem",
      }}
    >
      Every moment with you became a chapter I never want to end
    </p>
  </motion.div>
);

const Connector = () => (
  <div className="relative flex justify-center py-2">
    <motion.div
      variants={connector}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="h-16 w-px origin-top bg-gradient-to-b from-rose-400/50 via-purple-400/20 to-transparent"
    />

    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        delay: 0.2,
        duration: 0.4,
      }}
      className="
        absolute
        top-1/2
        h-2
        w-2
        -translate-y-1/2
        rounded-full
        bg-rose-400/70
        shadow-[0_0_12px_rgba(251,113,133,0.8)]
      "
    />
  </div>
);

const JourneyStep = ({ step, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col items-center gap-8 py-10 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <motion.div
        variants={isLeft ? fromLeft : fromRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{
          duration: 0.35,
        }}
        className={`group relative w-full cursor-default md:w-1/2`}
      >
        {/* Number Badge */}
        <motion.div
          variants={pop}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`absolute -top-4 z-20 ${isLeft ? "-left-3" : "-right-3"}`}
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-rose-400/30
              bg-rose-500/15
              text-xs
              font-bold
              text-rose-200
              backdrop-blur-md
            "
            style={{ fontFamily: SERIF }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>

        {/* Card */}
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            shadow-[0_20px_50px_rgba(0,0,0,.35)]
          "
        >
          <img
            src={step.image}
            alt={step.date}
            className="
              h-[300px]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isLeft
                ? "linear-gradient(135deg, rgba(244,63,94,.25), rgba(124,58,237,.15))"
                : "linear-gradient(225deg, rgba(244,63,94,.25), rgba(124,58,237,.15))",
              mixBlendMode: "multiply",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090f]/70 via-transparent to-transparent" />

          {/* Date */}
          <motion.div
            variants={pop}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className={`absolute bottom-4 ${
              isLeft ? "left-4" : "right-4"
            } rounded-full border border-rose-400/25 bg-[#09090f]/60 px-3 py-1 backdrop-blur-md`}
          >
            <span
              className="text-xs italic tracking-[0.2em] text-rose-300/90"
              style={{ fontFamily: SERIF }}
            >
              {step.date}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          delay: 0.15,
        }}
        className={`w-full text-center md:w-1/2 ${
          isLeft ? "md:text-left" : "md:text-right"
        }`}
      >
        <div
          className={`mb-4 flex items-center justify-center gap-2 ${
            isLeft ? "md:justify-start" : "md:justify-end"
          }`}
        >
          <div className="h-px w-5 bg-rose-400/50" />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-rose-400/60
            "
            style={{ fontFamily: SERIF }}
          >
            chapter {String(index + 1).padStart(2, "0")}
          </span>

          <div className="h-px w-5 bg-rose-400/50" />
        </div>

        <p
          className="text-white/80 italic leading-8"
          style={{
            fontFamily: SERIF,
            fontSize: "1.2rem",
          }}
        >
          {step.text}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
          }}
          className={`mt-6 text-center text-[4rem] text-rose-400/10 ${
            isLeft ? "md:text-left" : "md:text-right"
          }`}
        >
          ❝
        </motion.div>
      </motion.div>
    </div>
  );
};

const Journey = () => (
  <section className="relative overflow-hidden px-5 py-28">
    {/* Ambient Orbs */}
    <motion.div
      animate={{
        x: [0, 30, 0],
        y: [0, 20, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        left-[-8%]
        top-1/4
        h-96
        w-96
        rounded-full
        bg-rose-500/10
        blur-[110px]
      "
    />

    <motion.div
      animate={{
        x: [0, -30, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        bottom-1/3
        right-[-6%]
        h-80
        w-80
        rounded-full
        bg-purple-600/10
        blur-[100px]
      "
    />

    <motion.div
      animate={{
        x: [0, 20, 0],
        y: [0, -25, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        h-64
        w-64
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-pink-400/10
        blur-[90px]
      "
    />

    <SectionTitle />

    <div className="relative z-10 mx-auto flex max-w-5xl flex-col">
      {journey.map((step, index) => (
        <div key={index}>
          <JourneyStep step={step} index={index} />

          {index < journey.length - 1 && <Connector />}
        </div>
      ))}
    </div>
  </section>
);

export default Journey;
