import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await api.get("/posts")).data.data,
    staleTime: 60 * 1000,
  });

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => (await api.post("/posts", formData)).data.data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Memory posted 💜");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to create post"),
  });
};

export const useUpdatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await api.patch(`/posts/${id}`, data)).data.data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });
};
