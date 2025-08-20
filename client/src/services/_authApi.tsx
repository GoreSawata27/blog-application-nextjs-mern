import axios from "axios";
import { jwtDecode } from "jwt-decode";

const _authApi = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://deploy-backend-h9zt.onrender.com/",
});

_authApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject("No token in local storage");
    }

    // Decode the JWT token to check its expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      window.location.href = "/login";

      return Promise.reject("Your session has expired. Please log in again to continue.");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _authApi;
