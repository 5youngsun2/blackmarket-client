export const API_URL =
  process.env.NODE_ENV === "production"
    ? //    ? "https://blackmarket-server.onrender.com"
      "https://salty-bottles-behave.loca.lt"
    : "http://localhost:8080";
