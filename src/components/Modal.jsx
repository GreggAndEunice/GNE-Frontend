import { AnimatePresence, motion } from "framer-motion";
import { X } from "./icons.jsx";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const DISPLAY = "'Playfair Display', Georgia, serif";

export const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          p-4
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="
            absolute inset-0
            bg-[#06040e]/90
            backdrop-blur-xl
          "
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Card */}
        <motion.div
          className="
            relative z-10
            w-full
            max-w-lg

            rounded-[28px]

            bg-[#0d0a18]/95
            backdrop-blur-3xl

            border
            border-white/10

            shadow-[0_40px_100px_rgba(0,0,0,.7)]

            overflow-hidden
          "
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.94,
            y: 20,
          }}
          transition={{
            type: "spring",
            damping: 22,
            stiffness: 260,
          }}
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between

              px-6
              py-5

              border-b
              border-white/5

              bg-[#0d0a18]/90
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-white/90
                "
                style={{
                  fontFamily: DISPLAY,
                }}
              >
                {title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  italic
                  text-white/30
                "
                style={{
                  fontFamily: SERIF,
                }}
              >
                capture this chapter forever
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center

                rounded-full

                bg-white/5

                border
                border-white/10

                text-white/50

                transition

                hover:bg-pink-500/20
                hover:text-white
                cursor-pointer
              "
            >
              <X />
            </button>
          </div>

          {/* Body */}

          <div
            className="
              p-6

              max-h-[75vh]

              overflow-y-auto

              scrollbar-hide
            "
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
