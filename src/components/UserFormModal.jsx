import { useState } from "react";
import { Modal } from "./Modal.jsx";
import { useCreateUser } from "../hooks/useUsers.js";
import Input from "./Input.jsx";

import { User, Mail, Lock, Image } from "lucide-react";

export const UserFormModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const createUser = useCreateUser();

  const reset = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });

    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || form.password.length < 8) {
      return;
    }

    const fd = new FormData();

    fd.append("name", form.name.trim());

    fd.append("email", form.email.trim());

    fd.append("password", form.password);

    if (file) {
      fd.append("profilePicture", file);
    }

    await createUser.mutateAsync(fd);

    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add a user">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          icon={User}
          placeholder="Full name"
          value={form.name}
          maxLength={100}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <Input
          icon={Mail}
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <Input
          icon={Lock}
          type="password"
          placeholder="Password (minimum 8 characters)"
          value={form.password}
          minLength={8}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          required
        />

        <label
          className="
            flex
            flex-col
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-3
            text-sm
            text-white/50
            backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-2">
            <Image size={16} className="text-purple-300" />
            Profile picture
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
            className="
              text-xs
              text-white/60
              file:mr-3
              file:rounded-lg
              file:border-0
              file:bg-purple-500/20
              file:px-3
              file:py-1
              file:text-purple-200
            "
          />
        </label>

        <button
          type="submit"
          disabled={createUser.isPending}
          className="
            mt-3
            w-full
            rounded-xl
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-purple-500/30
            transition
            hover:scale-[1.02]
            disabled:opacity-50
            cursor-pointer
          "
        >
          {createUser.isPending ? "Creating..." : "Create user"}
        </button>
      </form>
    </Modal>
  );
};
