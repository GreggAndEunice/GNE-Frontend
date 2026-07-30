import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLogin, useMe } from "../hooks/useAuth.js";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: user } = useMe();
  const login = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) return;

    login.mutate(form);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">
      {/* Background */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center brightness-80 blur-xs"
        style={{
          backgroundImage: "url(/login-background.png)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Ambient Lights */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-125 w-125 bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-100 w-100 bg-pink-500/20 blur-[120px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 6 : 12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-2xl sm:max-w-md"
      >
        <div className="p-6 sm:p-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="mb-6 flex flex-col items-center gap-2"
          >
            {/* <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-2xl text-white"
            >
              <Heart />
            </motion.div> */}

            <h2 className="bg-gradient-to-r pb-3 from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-center text-3xl font-bold text-transparent">
              Gregg & Eunice
            </h2>

            <p className="text-center font-semibold text-gray-300">
              Welcome back Babe!
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none backdrop-blur-md transition focus:border-purple-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 pr-12 text-white placeholder:text-gray-400 outline-none backdrop-blur-md transition focus:border-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-300">
                Since the day our story began.
              </p>

              <Link
                to="/forgot-password"
                className="text-sm text-purple-300 transition hover:text-purple-500"
              >
                Recover access
              </Link>
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60"
            >
              {login.isPending ? "Signing in..." : "Enter Our Story"}
            </button>
          </form>
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-center sm:px-8">
          <p className="text-sm text-gray-300">
            Every click opens another chapter of our story.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
