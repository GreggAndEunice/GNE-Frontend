import { useState } from "react";
import { Modal } from "./Modal.jsx";
import { useCreateMessage } from "../hooks/useMessages.js";

import {
  Heart,
  Calendar,
  Type,
  FileText,
  Image,
  Video,
  Music,
  X,
} from "lucide-react";

import Input from "./Input.jsx";

const currentYear = new Date().getFullYear();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MessageFormModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    month: "",
    year: currentYear,
    content: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audio, setAudio] = useState(null);

  const createMessage = useCreateMessage();

  const reset = () => {
    setForm({
      title: "",
      month: "",
      year: currentYear,
      content: "",
    });

    setImages([]);
    setVideos([]);
    setAudio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.month || !form.year || !form.content.trim())
      return;

    const fd = new FormData();

    fd.append("title", form.title.trim());
    fd.append("month", form.month);
    fd.append("year", form.year);
    fd.append("content", form.content.trim());

    images.forEach((file) => fd.append("images", file));

    videos.forEach((file) => fd.append("videos", file));

    if (audio) fd.append("audio", audio);

    await createMessage.mutateAsync(fd);

    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="New Monthly Memory">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-[#120e20]/95
          border
          border-white/10
          backdrop-blur-2xl
          shadow-2xl
        "
      >
        {/* Ambient glow */}

        <div
          className="
            absolute
            -top-32
            -right-32
            h-64
            w-64
            rounded-full
            bg-pink-500/20
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-64
            w-64
            rounded-full
            bg-purple-600/20
            blur-[100px]
          "
        />

        <form
          onSubmit={handleSubmit}
          className="
            relative
            z-10
            space-y-5
            p-6
          "
        >
          {/* Header */}

          <div className="mb-6">
            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-pink-400/60
                italic
              "
            >
              capture a moment
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-bold
                bg-gradient-to-r
                from-pink-200
                via-pink-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              New Memory
            </h2>

            <p
              className="
                mt-2
                text-sm
                italic
                text-white/40
              "
            >
              Every chapter deserves to be remembered.
            </p>
          </div>

          {/* Title */}

          <Input
            icon={Type}
            placeholder="Memory title..."
            value={form.title}
            maxLength={200}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          {/* Date */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            <div className="relative">
              <Calendar
                className="
                  absolute
                  left-3
                  top-3
                  h-5
                  w-5
                  text-purple-300/80
                "
              />

              <div className="relative">
                <Calendar
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    h-5
                    w-5
                    text-pink-300/70
                    pointer-events-none
                  "
                />

                <select
                  className="
                    appearance-none

                    w-full
                    pl-10
                    pr-10
                    py-3

                    rounded-xl

                    bg-white/[0.05]
                    backdrop-blur-xl

                    border
                    border-white/10

                    text-white/90
                    text-sm

                    cursor-pointer

                    outline-none

                    transition-all
                    duration-300

                    hover:bg-white/[0.08]
                    hover:border-pink-400/30

                    focus:border-pink-400/50
                    focus:ring-2
                    focus:ring-pink-500/20
                  "
                  value={form.month}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      month: Number(e.target.value),
                    })
                  }
                >
                  <option value="" className="bg-[#120e20] text-white/50">
                    Select Month
                  </option>

                  {MONTHS.map((month, index) => (
                    <option
                      key={month}
                      value={index + 1}
                      className="bg-[#120e20] text-white"
                    >
                      {month}
                    </option>
                  ))}
                </select>

                {/* Custom arrow */}
                <div
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2

                    pointer-events-none

                    text-pink-300/70
                  "
                >
                  ✦
                </div>
              </div>
            </div>

            <div className="relative">
              <Calendar
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  h-5
                  w-5
                  text-pink-300/70
                  pointer-events-none
                "
              />

              <input
                type="number"
                min={2000}
                max={currentYear}
                placeholder="Year"
                value={form.year}
                onChange={(e) =>
                  setForm({
                    ...form,
                    year: Number(e.target.value),
                  })
                }
                className="
                  w-full

                  pl-10
                  pr-4
                  py-3

                  rounded-xl

                  bg-white/[0.05]
                  backdrop-blur-xl

                  border
                  border-white/10

                  text-white/90
                  placeholder-white/30

                  text-sm

                  outline-none

                  transition-all
                  duration-300

                  hover:bg-white/[0.08]
                  hover:border-pink-400/30

                  focus:border-pink-400/50
                  focus:ring-2
                  focus:ring-pink-500/20
                "
              />
            </div>
          </div>

          {/* Content */}

          <div className="relative">
            <FileText
              className="
                absolute
                left-3
                top-3
                h-5
                w-5
                text-purple-300/80
              "
            />

            <textarea
              rows={5}
              placeholder="Write your memory..."
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl

                bg-white/5
                backdrop-blur-xl

                border
                border-white/10

                text-white
                placeholder-gray-400

                resize-none

                focus:outline-none
                focus:border-purple-400/50
                focus:ring-2
                focus:ring-purple-500/20
              "
            />
          </div>

          {/* Upload Section */}

          <div>
            <p
              className="
                mb-3
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              Attachments
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <UploadBox
                  icon={Image}
                  label="Images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />

                <UploadBox
                  icon={Video}
                  label="Videos"
                  accept="video/*"
                  multiple
                  onChange={(e) => setVideos(Array.from(e.target.files))}
                />

                <UploadBox
                  icon={Music}
                  label="Audio"
                  accept="audio/*"
                  onChange={(e) => setAudio(e.target.files[0] || null)}
                />
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <AttachmentList
                  title="Images"
                  files={images}
                  icon={Image}
                  onRemove={(index) =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                />
              )}

              {/* Video Preview */}
              {videos.length > 0 && (
                <AttachmentList
                  title="Videos"
                  files={videos}
                  icon={Video}
                  onRemove={(index) =>
                    setVideos(videos.filter((_, i) => i !== index))
                  }
                />
              )}

              {/* Audio Preview */}
              {audio && (
                <AttachmentList
                  title="Audio"
                  files={[audio]}
                  icon={Music}
                  onRemove={() => setAudio(null)}
                />
              )}
            </div>
          </div>

          {/* Submit */}

          <button
            disabled={createMessage.isPending}
            className="
              w-full
              rounded-full

              py-3

              bg-gradient-to-r
              from-pink-600
              to-purple-600

              text-white
              font-semibold

              shadow-lg
              shadow-purple-500/30

              transition

              hover:scale-[1.02]

              disabled:opacity-50
            "
          >
            {createMessage.isPending ? "Saving..." : "Save Memory ✦"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

const AttachmentList = ({ title, files, icon: Icon, onRemove }) => {
  return (
    <div>
      <p
        className="
          mb-2
          text-xs
          uppercase
          tracking-[0.25em]
          text-white/30
        "
      >
        {title}
      </p>

      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-3

              rounded-xl

              bg-white/5

              border
              border-white/10

              px-3
              py-2

              backdrop-blur-xl
            "
          >
            <Icon
              size={16}
              className="
                text-pink-300/70
              "
            />

            <span
              className="
                flex-1
                truncate
                text-sm
                text-white/60
              "
            >
              {file.name}
            </span>

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="
                flex
                h-6
                w-6
                items-center
                justify-center

                rounded-full

                bg-red-500/10

                text-red-300

                transition

                hover:bg-red-500/20
              "
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const UploadBox = ({ icon: Icon, label, accept, multiple, onChange }) => (
  <label
    className="
  flex
  flex-col
  items-center
  justify-center

  gap-2

  h-24

  rounded-xl

  cursor-pointer

  bg-white/5

  border
  border-white/10

  text-white/40

  hover:bg-white/10

  transition
"
  >
    <Icon size={20} className="text-pink-300/70" />

    <span
      className="
text-xs
"
    >
      {label}
    </span>

    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      className="hidden"
    />
  </label>
);
