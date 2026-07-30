import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useMessages } from "../hooks/useMessages.js";
import { groupMessagesByMonth } from "../lib/groupByMonth.js";
import { useLoadMore } from "../hooks/useLoadMore.js";

import { GroupCard } from "../components/GroupCard.jsx";
import { MessageFormModal } from "../components/MessageFormModal.jsx";
import { Plus } from "../components/icons.jsx";
import GlowOrbs from "../components/GlowOrbs.jsx";

export const Messages = () => {
  const { data: messages, isLoading } = useMessages();

  const [open, setOpen] = useState(false);

  const groups = useMemo(() => groupMessagesByMonth(messages), [messages]);

  const { visibleCount, sentinelRef, hasMore } = useLoadMore(groups.length, 9);

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
        bg-[#09090f]
        px-4
        pb-28
        pt-10
      "
    >
      {/* Ambient Background */}

      <GlowOrbs />

      <div
        className="
        mx-auto
        max-w-5xl
      "
      >
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
            mb-12
            text-center
          "
        >
          <p
            className="
              mb-4
              text-xs
              uppercase
              tracking-[0.4em]
              text-pink-400/60
              italic
              font-serif
            "
          >
            a diary of us
          </p>

          <h2
            className="
              bg-gradient-to-br
              from-pink-100
              via-pink-300
              to-violet-400
              bg-clip-text
              text-4xl
              p-2
              font-bold
              text-transparent
              sm:text-6xl
            "
          >
            Our Memories
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
          </div>

          <p
            className="
              mx-auto
              mt-5
              max-w-md
              text-base
              italic
              text-white/40
              font-serif
            "
          >
            Your monthly notes, moments, and stories kept forever
          </p>
        </motion.div>

        {/* Loading */}

        {isLoading && (
          <div
            className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            md:grid-cols-3
          "
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-64
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  animate-pulse
                "
              />
            ))}
          </div>
        )}

        {/* Empty */}

        {!isLoading && groups.length === 0 && (
          <div
            className="
            py-24
            text-center
          "
          >
            <p
              className="
                text-xl
                text-white/40
                italic
                font-serif
              "
            >
              No memories written yet...
            </p>
          </div>
        )}

        {/* Cards */}

        {!isLoading && groups.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
              md:grid-cols-3
            "
          >
            {groups.slice(0, visibleCount).map((g, index) => (
              <motion.div
                key={`${g.year}-${g.month}`}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <GroupCard group={g} basePath="/messages" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {hasMore && (
          <div
            ref={sentinelRef}
            className="
              h-12
            "
          />
        )}
      </div>

      {/* Floating Add Button */}

      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.92,
        }}
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-24
          right-6
          z-40
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-pink-600
          to-violet-600
          text-white
          shadow-2xl
          shadow-pink-500/30
          cursor-pointer
        "
      >
        <Plus />
      </motion.button>

      <MessageFormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
