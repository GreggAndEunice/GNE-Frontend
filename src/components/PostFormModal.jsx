import { useState } from "react";
import { Modal } from "./Modal.jsx";
import { useCreatePost } from "../hooks/usePosts.js";

export const PostFormModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audio, setAudio] = useState(null);
  const createPost = useCreatePost();

  const reset = () => {
    setForm({ title: "", content: "" });
    setImages([]);
    setVideos([]);
    setAudio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("content", form.content.trim());
    images.forEach((f) => fd.append("images", f));
    videos.forEach((f) => fd.append("videos", f));
    if (audio) fd.append("audio", audio);

    await createPost.mutateAsync(fd);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="New memory">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded-xl border border-romance-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-romance-500"
          placeholder="Title"
          value={form.title}
          maxLength={200}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full rounded-xl border border-romance-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-romance-500"
          placeholder="Tell the story..."
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <div className="grid grid-cols-3 gap-2 text-xs">
          <label className="flex flex-col gap-1">
            Images
            <input type="file" accept="image/*" multiple onChange={(e) => setImages([...e.target.files])} />
          </label>
          <label className="flex flex-col gap-1">
            Videos
            <input type="file" accept="video/*" multiple onChange={(e) => setVideos([...e.target.files])} />
          </label>
          <label className="flex flex-col gap-1">
            Audio
            <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0] || null)} />
          </label>
        </div>

        <button
          type="submit"
          disabled={createPost.isPending}
          className="w-full rounded-xl bg-gradient-to-r from-romance-500 to-romance-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-300/60 disabled:opacity-60"
        >
          {createPost.isPending ? "Posting..." : "Post memory"}
        </button>
      </form>
    </Modal>
  );
};
