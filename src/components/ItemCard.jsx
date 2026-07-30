import { useState } from "react";
import { motion } from "framer-motion";
import { LazyImage } from "./LazyImage.jsx";
import { Trash, Pencil } from "./icons.jsx";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ item, canManage, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const save = async () => {
    if (!title.trim() || !content.trim()) return;

    await onUpdate({
      title: title.trim(),
      content: content.trim(),
    });

    setEditing(false);
  };

  return (
    <motion.div
      onClick={() => navigate(`/message/${item.id}`)}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        relative
        cursor-pointer
      "
    >
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.035]
          backdrop-blur-xl
          shadow-lg
          shadow-black/30

          transition-all
          duration-300

          group-hover:shadow-[0_28px_60px_rgba(192,132,252,0.2)]
          group-hover:border-pink-400/20
        "
      >
        {/* Images */}

        {item.images?.[0]?.url && (
          <div
            className="
              relative
              h-52
              overflow-hidden
            "
          >
            <LazyImage
              src={item.images[0].url}
              className="
                h-full
                w-full
                object-cover

                transition-transform
                duration-700
                ease-out

                group-hover:scale-105
              "
            />

            {/* Gradient fade */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#09090f]/90
                via-transparent
                to-transparent
              "
            />
          </div>
        )}

        <div className="p-6">
          {/* Chapter marker */}

          <div
            className="
              mb-3
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
                tracking-[0.25em]
                text-pink-300/50
              "
            >
              memory
            </span>
          </div>

          {editing ? (
            <div onClick={(e) => e.stopPropagation()} className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-purple-400/50
                "
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-purple-400/50
                "
              />

              <div className="flex gap-2">
                <button
                  onClick={save}
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-pink-600
                    to-purple-600
                    px-5
                    py-2
                    text-sm
                    text-white
                  "
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="
                    rounded-full
                    bg-white/10
                    px-5
                    py-2
                    text-sm
                    text-white/70
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Title */}

              <div
                className="
                flex
                items-start
                justify-between
                gap-3
              "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white/90
                  "
                >
                  {item.title}
                </h2>

                {canManage && (
                  <div
                    className="
                    flex
                    gap-2
                    text-white/40
                  "
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing(true);
                      }}
                      className="hover:text-pink-300 cursor-pointer"
                    >
                      <Pencil />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                      className="hover:text-red-400 cursor-pointer"
                    >
                      <Trash />
                    </button>
                  </div>
                )}
              </div>

              {/* Content preview */}

              <div
                className="
                  relative
                  mt-4
                  h-16
                  overflow-hidden
                "
              >
                <p
                  className="
                    italic
                    text-white/45
                    font-serif
                  "
                  style={{
                    filter: "blur(4px)",
                  }}
                >
                  {item.content}
                </p>

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      italic
                      text-white/35
                      font-serif
                    "
                  >
                    read memory ✦
                  </span>
                </div>
              </div>

              {/* Footer */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-3
                "
              >
                <span
                  className="
                    text-xs
                    text-white/30
                    italic
                    font-serif
                  "
                >
                  preserved moment
                </span>

                {item.author?.name && (
                  <span
                    className="
                      text-xs
                      text-purple-300/70
                      font-serif
                    "
                  >
                    from {item.author.name}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
