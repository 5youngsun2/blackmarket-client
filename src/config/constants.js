export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://blackmarket-server.onrender.com"
    : "http://localhost:8080";
