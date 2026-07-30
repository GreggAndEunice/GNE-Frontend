import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users as UsersIcon,
  UserPlus,
  Shield,
  Trash2,
  Mail,
} from "lucide-react";

import { useUsers, useDeleteUser } from "../hooks/useUsers.js";
import { useMe } from "../hooks/useAuth.js";
import { LazyImage } from "../components/LazyImage.jsx";
import { UserFormModal } from "../components/UserFormModal.jsx";
import GlowOrbs from "../components/GlowOrbs.jsx";

export const Users = () => {
  const { data: me } = useMe();
  const { data: users, isLoading } = useUsers();

  const deleteUser = useDeleteUser();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12] text-white">
      <GlowOrbs />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1
              className="text-4xl font-semibold"
              style={{
                background:
                  "linear-gradient(135deg,#fce7f3,#f9a8d4,#c084fc,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Users
            </h1>

            <p className="mt-2 text-white/50">
              Manage who has access to your application.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="
              flex
              items-center
              gap-2
              self-start
              rounded-2xl
              bg-gradient-to-r
              from-fuchsia-500
              via-violet-600
              to-indigo-600
              px-5
              py-3
              font-medium
              shadow-lg
            "
          >
            <UserPlus size={18} />
            Add User
          </motion.button>
        </div>

        {/* Loading */}

        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-20
                  animate-pulse
                  rounded-2xl
                  bg-white/5
                "
              />
            ))}
          </div>
        )}

        {/* Users */}

        {!isLoading && (
          <div className="space-y-4">
            {users?.map((u) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.01,
                }}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-5
                  backdrop-blur-xl
                  shadow-lg
                "
              >
                <div className="flex items-center gap-5">
                  <LazyImage
                    src={u.profilePictureUrl}
                    className="
                      h-14
                      w-14
                      rounded-full
                      border
                      border-white/10
                      object-cover
                    "
                  />

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold text-lg">{u.name}</h2>

                      {u.role === "admin" && (
                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            border
                            border-violet-500/30
                            bg-violet-500/10
                            px-3
                            py-1
                            text-xs
                            text-violet-300
                          "
                        >
                          <Shield size={12} />
                          Admin
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-white/45">
                      <Mail size={14} />
                      {u.email}
                    </div>
                  </div>
                </div>

                {u.role !== "admin" && u.id !== me?.id && (
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={() => deleteUser.mutate(u.id)}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/10
                      text-red-400
                      transition
                      hover:bg-red-500/20
                    "
                  >
                    <Trash2 size={18} />
                  </motion.button>
                )}
              </motion.div>
            ))}

            {users?.length === 0 && (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  py-24
                  text-center
                "
              >
                <UsersIcon size={60} className="mb-4 text-white/20" />

                <h3 className="text-xl font-semibold">No users found</h3>

                <p className="mt-2 text-white/45">
                  Create your first user to get started.
                </p>
              </div>
            )}
          </div>
        )}

        <UserFormModal open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};
