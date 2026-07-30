import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

// Cached with react-query; refetches only when invalidated by a mutation
// below (create/update/delete), not on every render/navigation.
export const useMessages = () =>
  useQuery({
    queryKey: ["messages"],
    queryFn: async () => (await api.get("/messages")).data.data,
    staleTime: 60 * 1000,
  });

export const useMessage = (id) =>
  useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      const res = await api.get(`/messages/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });

export const useCreateMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) =>
      (await api.post("/messages", formData)).data.data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message added 💜");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to create message"),
  });
};

export const useUpdateMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) =>
      (await api.patch(`/messages/${id}`, data)).data.data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message updated");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Update failed"),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => api.delete(`/messages/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message deleted");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Delete failed"),
  });
};
