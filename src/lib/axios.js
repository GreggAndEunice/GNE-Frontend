import axios from "axios";

// withCredentials lets the browser send/receive the httpOnly auth cookie
// even though the frontend and API are hosted on different domains.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});
