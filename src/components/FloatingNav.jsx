import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Heart,
  X,
  Home,
  Mail,
  Images,
  User,
  Users,
  LogOut,
} from "lucide-react";

import { useLogout, useMe } from "../hooks/useAuth.js";

const baseLinks = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    end: true,
    color: "#f472b6",
  },
  {
    to: "/beginning",
    label: "Beginning",
    icon: Heart,
    color: "#D2042D",
  },
  {
    to: "/messages",
    label: "Messages",
    icon: Mail,
    color: "#c084fc",
  },
  {
    to: "/posts",
    label: "Memories",
    icon: Images,
    color: "#fb7185",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
    color: "#a78bfa",
  },
];

export const FloatingNav = () => {
  const [open, setOpen] = useState(false);

  const logout = useLogout();

  const { data: user } = useMe();

  const links =
    user?.role === "admin"
      ? [
          ...baseLinks,
          {
            to: "/users",
            label: "Users",
            icon: Users,
            color: "#38bdf8",
          },
        ]
      : baseLinks;

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        flex-col
        items-end
        gap-3
      "
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.95,
            }}
            className="
              flex
              min-w-[210px]
              flex-col
              gap-1
              rounded-2xl
              border
              border-white/10
              bg-[#0f0c19]/90
              p-2
              shadow-2xl
              shadow-black/50
              backdrop-blur-xl
            "
          >
            {links.map(({ to, label, icon: Icon, end, color }, index) => (
              <motion.div
                key={to}
                initial={{
                  opacity: 0,
                  x: 24,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.045,
                }}
              >
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    h-11
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    text-left
                    text-sm
                    font-semibold
                    tracking-wide
                    transition-all
                    ${isActive ? "border-white/10" : "border-transparent"}
                    `
                  }
                  style={({ isActive }) => ({
                    background: isActive ? `${color}20` : "transparent",

                    color: isActive ? color : "rgba(255,255,255,.55)",
                  })}
                >
                  <span
                    className="
                      flex
                      items-center
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <Icon />
                  </span>

                  <span>{label}</span>

                  <span
                    className="
                      ml-auto
                      h-1.5
                      w-1.5
                      rounded-full
                      opacity-0
                      transition
                      group-data-[active=true]:opacity-100
                    "
                  />
                </NavLink>
              </motion.div>
            ))}

            {/* Divider */}

            <div
              className="
                my-1
                h-px
                bg-gradient-to-r
                from-pink-400/40
                via-purple-400/20
                to-transparent
              "
            />

            <motion.button
              initial={{
                opacity: 0,
                x: 24,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: links.length * 0.045,
              }}
              onClick={() => logout.mutate()}
              className="
                group
                flex
                h-11
                items-center
                gap-3
                rounded-xl
                px-3
                text-sm
                font-semibold
                text-red-400
                transition
                hover:bg-red-500/10
              "
            >
              <LogOut
                className="
                  transition
                  group-hover:scale-110
                "
              />
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{
          scale: 0.9,
        }}
        className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-gradient-to-br
          from-pink-700
          to-purple-700
          text-white
          shadow-lg
          shadow-pink-500/30
          cursor-pointer
        "
      >
        {/* Pulse */}

        <>
          {/* Outer soft pulse */}
          <motion.span
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.35, 0, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0
              rounded-full
              bg-gradient-to-br
              from-pink-600
              to-purple-600
              blur-sm
            "
          />

          {/* Inner glow pulse */}
          <motion.span
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.45, 0.15, 0.45],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="
              absolute
              inset-0
              rounded-full
              bg-gradient-to-br
              from-pink-400
              to-purple-500
              blur-md
            "
          />
        </>

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="heart"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
            >
              <Heart size={22} stroke="white" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
