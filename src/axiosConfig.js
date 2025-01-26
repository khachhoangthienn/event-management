import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const axiosPublic = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 500 &&
      error.response.data.message === "Token invalid"
    ) {
      const oldToken = localStorage.getItem("authToken");
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/refresh",
          {
            token: oldToken,
          }
        );
        if (response.status === 200) {
          const newToken = await response.data.result.token;
          localStorage.setItem("authToken", newToken);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        const { setInfo } = useContext(UserContext); // Lấy setInfo từ context
        setInfo(null); // Reset giá trị thông tin
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
