import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { usePosts, useDeletePost, useUpdatePost } from "../hooks/usePosts.js";
import { monthName } from "../lib/groupByMonth.js";
import { useMe } from "../hooks/useAuth.js";
import { ItemCard } from "../components/ItemCard.jsx";
import { ChevronLeft } from "../components/icons.jsx";

export const PostGroupDetail = () => {
  const { year, month } = useParams();
  const { data: posts, isLoading } = usePosts();
  const { data: user } = useMe();
  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();

  const items = useMemo(
    () =>
      (posts || []).filter((p) => {
        const d = new Date(p.createdAt);
        return d.getFullYear() === Number(year) && d.getMonth() + 1 === Number(month);
      }),
    [posts, year, month]
  );

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-10">
      <Link to="/posts" className="mb-4 inline-flex items-center gap-1 text-sm text-romance-600 hover:underline">
        <ChevronLeft /> Back to memories
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-romance-800">
        {monthName(Number(month))} {year}
      </h1>

      {isLoading && <p className="text-romance-400">Loading...</p>}
      {!isLoading && items.length === 0 && <p className="text-romance-400">Nothing here.</p>}

      <div className="space-y-5">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            canManage={user?.role === "admin" || item.userId === user?.id}
            onDelete={() => deletePost.mutate(item.id)}
            onUpdate={(data) => updatePost.mutateAsync({ id: item.id, data })}
          />
        ))}
      </div>
    </div>
  );
};
