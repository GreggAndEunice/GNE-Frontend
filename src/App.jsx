import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import { Messages } from "./pages/Messages.jsx";
import { MessageGroupDetail } from "./pages/MessageGroupDetail.jsx";
import { Posts } from "./pages/Posts.jsx";
import { PostGroupDetail } from "./pages/PostGroupDetail.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Users } from "./pages/Users.jsx";
import Beginning from "./components/Beginning.jsx";
import Message from "./components/Message.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#faf5ff",
              color: "#581c87",
              border: "1px solid #e9d5ff",
              borderRadius: "14px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#9333ea", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/beginning" element={<Beginning />} />
            <Route
              path="/messages/:year/:month"
              element={<MessageGroupDetail />}
            />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/posts" element={<UnderConstruction />} />
            <Route path="/posts/:year/:month" element={<UnderConstruction />} />

            <Route path="/profile" element={<Profile />} />
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
