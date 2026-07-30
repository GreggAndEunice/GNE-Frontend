import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePosts } from "../hooks/usePosts.js";
import { groupPostsByMonth } from "../lib/groupByMonth.js";
import { useLoadMore } from "../hooks/useLoadMore.js";
import { GroupCard } from "../components/GroupCard.jsx";
import { PostFormModal } from "../components/PostFormModal.jsx";
import { Plus } from "../components/icons.jsx";

export const Posts = () => {
  const { data: posts, isLoading } = usePosts();
  const [open, setOpen] = useState(false);
  const groups = useMemo(() => groupPostsByMonth(posts), [posts]);
  const { visibleCount, sentinelRef, hasMore } = useLoadMore(groups.length, 9);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-28 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-romance-800">Memories</h1>
          <p className="text-sm text-romance-500">Everything you've posted together</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-romance-500 to-romance-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-300/60"
        >
          <Plus /> New
        </motion.button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl bg-romance-100" />
          ))}
        </div>
      )}

      {!isLoading && groups.length === 0 && (
        <p className="mt-16 text-center text-romance-400">No memories yet. Post your first one!</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {groups.slice(0, visibleCount).map((g) => (
          <GroupCard key={`${g.year}-${g.month}`} group={g} basePath="/posts" />
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} className="h-8" />}

      <PostFormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
