import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/auth/me")).data.data,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => (await api.post("/auth/login", payload)).data.data,
    onSuccess: (user) => {
      qc.setQueryData(["me"], user);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Invalid email or password");
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => api.post("/auth/logout"),
    onSuccess: () => {
      qc.clear();
      toast.success("See you soon!");
      navigate("/login", { replace: true });
    },
    onError: () => {
      // Even if the server call fails, clear local state and send them
      // back to login rather than leaving them stuck on a protected page.
      qc.clear();
      navigate("/login", { replace: true });
    },
  });
};

export const useUpdateMe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => (await api.patch("/users/me", formData)).data.data,
    onSuccess: (user) => {
      qc.setQueryData(["me"], user);
      toast.success("Profile updated");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });
};
