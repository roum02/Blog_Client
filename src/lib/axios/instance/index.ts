import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000, // 10초
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
