import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { useMessage } from "../hooks/useMessages.js";
import GlowOrbs from "./GlowOrbs.jsx";
import { fadeUp } from "../animations/variants.js";

const wordReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
    },
  },
};

const Message = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: message, isLoading } = useMessage(id);
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!message) return;

    document.body.style.overflow = started ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [started, message]);

  useEffect(() => {
    if (!started) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [started]);

  const handleStartMemory = async () => {
    setStarted(true); // unlock scrolling

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        console.log("Audio playing");
      } catch (error) {
        console.log("Audio error:", error);
      }
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  if (isLoading || !message) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#0b0b12]
          text-white/40
        "
      >
        Loading memory...
      </div>
    );
  }

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0b0b12]
        px-6
        pb-10
        text-white
      "
    >
      {/* Background Glow */}

      <GlowOrbs />

      {/* Audio Autoplay */}
      {message.audioUrl && (
        <audio ref={audioRef} src={message.audioUrl} loop preload="auto" />
      )}

      {/* Hero */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="
          relative
          z-10
          flex
          h-screen
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <h2
          className="
            text-7xl
            md:text-6xl
            leading-30
            py-10
            font-bold
          "
          style={{
            background:
              "linear-gradient(135deg,#fce7f3,#f9a8d4,#c084fc,#818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {message.title}
        </h2>

        <p
          className="
            mt-6
            tracking-[0.5em]
            text-sm
            text-white/40
          "
        >
          CLICK THE ARROW TO VIEW MESSAGE
        </p>

        <ArrowDown
          onClick={handleStartMemory}
          className="
            mt-6
            animate-bounce
            text-white/30
            cursor-pointer
            hover:text-white/70
            transition
          "
          size={40}
        />
      </motion.section>

      {/* Content */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-3xl
        "
      >
        {message.content.split("\n").map((paragraph, index) => (
          <p
            key={index}
            className="
              pt-2
              mb-10
              text-2xl
              leading-12
              text-justify
              text-white/80
            "
          >
            {paragraph.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                }}
                className="
                  inline-block
                  mr-2
                "
              >
                {word}
              </motion.span>
            ))}
          </p>
        ))}

        <p
          className="
            mt-12
            text-right
            text-sm
            text-white/40
          "
        >
          — {message.author.name}
        </p>
      </motion.section>

      {/* IMAGES */}

      {message.images?.length > 0 && (
        <motion.section
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
          className="
            relative
            z-10
            mx-auto
            mt-24
            max-w-5xl
          "
        >
          <div
            className={`grid gap-6 ${message.images.length === 1 ? "place-items-center" : "md:grid-cols-2"}`}
          >
            {message.images.map((img) => (
              <motion.div
                key={img.id}
                className="
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
                <motion.img
                  src={img.url}
                  alt=""
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className={`object-cover ${message.images.length === 1 ? "h-[600px] max-w-3xl" : "h-96 w-full"} w-full`}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* VIDEOS */}

      {message.videos?.length > 0 && (
        <motion.section
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
          className="
            relative
            z-10
            mx-auto
            mt-24
            max-w-5xl
          "
        >
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            {message.videos.map((video) => (
              <motion.div
                key={video.id}
                className="
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
                <video
                  src={video.url}
                  controls
                  className="
                    h-96
                    w-full
                    object-cover
                  "
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Message;
