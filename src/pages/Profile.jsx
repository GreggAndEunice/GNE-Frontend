import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, User, Lock, Mail, Shield, Upload, LogOut } from "lucide-react";

import { useMe, useUpdateMe, useLogout } from "../hooks/useAuth.js";
import { LazyImage } from "../components/LazyImage.jsx";
import GlowOrbs from "../components/GlowOrbs.jsx";

export const Profile = () => {
  const { data: user } = useMe();

  const updateMe = useUpdateMe();
  const logout = useLogout();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    if (name.trim() && name.trim() !== user?.name) {
      fd.append("name", name.trim());
    }

    if (password) {
      fd.append("password", password);
    }

    if (file) {
      fd.append("profilePicture", file);
    }

    if ([...fd.keys()].length === 0) return;

    await updateMe.mutateAsync(fd);

    setPassword("");
    setFile(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12] text-white">
      <GlowOrbs />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="
            w-full
            max-w-lg
            rounded-3xl
            border
            border-white/10
            bg-white/[0.035]
            p-8
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,.45)]
          "
        >
          {/* Heading */}

          <h1
            className="mb-8 text-center text-3xl font-semibold"
            style={{
              background:
                "linear-gradient(135deg,#fce7f3,#f9a8d4,#c084fc,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Profile
          </h1>

          {/* Avatar */}

          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              <LazyImage
                src={user?.profilePictureUrl}
                className="h-24 w-24 rounded-full border-2 border-white/10 object-cover"
              />

              <label
                className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-600
                  transition
                  hover:scale-110
                "
              >
                <Camera size={16} />

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>

            <p className="mt-1 text-sm text-white/50">{user?.email}</p>

            {user?.role === "admin" && (
              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-3
                  py-1
                  text-xs
                  text-violet-300
                "
              >
                <Shield size={14} />
                Administrator
              </div>
            )}
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-white/60">
                <User size={15} />
                Display Name
              </label>

              <div
                className="
                  flex
                  items-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                "
              >
                <User size={17} className="text-white/40" />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full
                    bg-transparent
                    px-3
                    py-3.5
                    outline-none
                    placeholder:text-white/25
                  "
                  placeholder="Display Name"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-white/60">
                <Mail size={15} />
                Email Address
              </label>

              <div
                className="
                  flex
                  items-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                "
              >
                <Mail size={17} className="text-white/40" />

                <input
                  disabled
                  value={user?.email || ""}
                  className="
                    w-full
                    bg-transparent
                    px-3
                    py-3.5
                    text-white/40
                    outline-none
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-white/60">
                <Lock size={15} />
                New Password
              </label>

              <div
                className="
                  flex
                  items-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                "
              >
                <Lock size={17} className="text-white/40" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="
                    w-full
                    bg-transparent
                    px-3
                    py-3.5
                    outline-none
                    placeholder:text-white/25
                  "
                />
              </div>
            </div>

            {/* Upload */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-dashed
                border-white/15
                bg-white/[0.03]
                py-4
                text-sm
                text-white/60
                transition
                hover:border-violet-500
                hover:bg-violet-500/10
              "
            >
              <Upload size={18} />

              {file ? file.name : "Choose New Profile Picture"}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Buttons */}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={updateMe.isPending}
                className="
                  flex-1
                  rounded-2xl
                  bg-gradient-to-r
                  from-fuchsia-500
                  via-violet-600
                  to-indigo-600
                  py-3
                  font-medium
                  text-white
                  shadow-lg
                "
              >
                {updateMe.isPending ? "Saving..." : "Save Changes"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => logout.mutate()}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-5
                  py-3
                  text-red-300
                  transition
                  hover:bg-red-500/20
                "
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
