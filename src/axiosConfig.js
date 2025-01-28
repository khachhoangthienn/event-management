import axios from "axios";
import { toast } from "react-toastify";

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

          const originalRequest = error.config; // Lấy config của request ban đầu
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`; // Cập nhật lại header với token mới

          // Gửi lại request ban đầu
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        toast.error("Session expired. Please login again.", {
          autoClose: 3000,
          hideProgressBar: false,
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    }
  }
);

export default axiosInstance;
