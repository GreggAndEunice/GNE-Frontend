import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  useMessages,
  useDeleteMessage,
  useUpdateMessage,
} from "../hooks/useMessages.js";

import { monthName } from "../lib/groupByMonth.js";
import { useMe } from "../hooks/useAuth.js";

import { ItemCard } from "../components/ItemCard.jsx";
import { ChevronLeft } from "../components/icons.jsx";
import GlowOrbs from "../components/GlowOrbs.jsx";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const DISPLAY = "'Playfair Display', Georgia, serif";

export const MessageGroupDetail = () => {
  const { year, month } = useParams();

  const { data: messages, isLoading } = useMessages();
  const { data: user } = useMe();

  const deleteMessage = useDeleteMessage();
  const updateMessage = useUpdateMessage();

  const items = useMemo(
    () =>
      (messages || []).filter(
        (m) => String(m.year) === year && String(m.month) === month,
      ),
    [messages, year, month],
  );

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0b0b12]
        px-4
        pb-28
        pt-10
        text-white
      "
    >
      {/* Ambient Orbs */}

      <GlowOrbs />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-96
          w-96
          rounded-full
          bg-pink-500/15
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
        "
      >
        {/* Back */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <Link
            to="/messages"
            className="
              mb-10
              inline-flex
              items-center
              gap-2

              text-sm
              text-white/40

              transition

              hover:text-pink-300
              font-serif
            "
          >
            <ChevronLeft />
            Back to memories
          </Link>
        </motion.div>

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mb-14
            text-center
          "
        >
          <p
            className="
              mb-4
              text-xs
              uppercase
              tracking-[0.4em]
              text-pink-400/50
              italic
              font-serif
            "
          >
            chapter
          </p>

          <h2
            className="
              bg-gradient-to-br
              from-pink-100
              via-pink-300
              to-purple-400

              bg-clip-text

              text-5xl
              font-bold

              text-transparent
              py-7

              sm:text-6xl
            "
          >
            {monthName(Number(month))} {year}
          </h2>

          <div
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
                text-pink-300/50
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
          </div>

          <p
            className="
              mx-auto
              mt-5
              max-w-md
              text-base
              italic
              text-white/35
              font-serif
            "
          >
            A collection of moments worth remembering
          </p>
        </motion.div>

        {/* Loading */}

        {isLoading && (
          <p
            className="
              text-center
              italic
              text-white/30
              font-serif
            "
          >
            gathering memories...
          </p>
        )}

        {/* Empty */}

        {!isLoading && items.length === 0 && (
          <div
            className="
              py-20
              text-center
            "
          >
            <h2
              className="
                text-2xl
                text-white/40
              "
            >
              This chapter is blank
            </h2>

            <p
              className="
                mt-3
                italic
                text-white/25
                font-serif
              "
            >
              No memories have been written here yet
            </p>
          </div>
        )}

        {/* Cards */}

        {!isLoading && items.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              space-y-6
            "
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10

                    bg-white/[0.035]

                    backdrop-blur-xl

                    p-2

                    shadow-2xl
                    shadow-black/30
                  "
                >
                  <ItemCard
                    item={item}
                    canManage={
                      user?.role === "admin" || item.userId === user?.id
                    }
                    onDelete={() => deleteMessage.mutate(item.id)}
                    onUpdate={(data) =>
                      updateMessage.mutateAsync({
                        id: item.id,
                        data,
                      })
                    }
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
