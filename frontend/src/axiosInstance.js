// src/axiosInstance.js
import axios from "axios";

/**
 * Robust axios instance for the app.
 * - baseURL points to backend root (no trailing /api so we can call either /api/... or other endpoints)
 * - Request interceptor tries to normalize token stored in localStorage in multiple shapes:
 *    - raw string token
 *    - "Bearer ..." string
 *    - JSON stringified object like '{"token":"..."}' or '{"accessToken":"..."}'
 *    - nested shape { token: "..." } returned accidentally
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

function extractTokenFromStoredValue(raw) {
  if (!raw) return null;

  // If value looks like JSON object, try to parse and extract common keys
  if (typeof raw === "string" && raw.trim().startsWith("{")) {
    try {
      const obj = JSON.parse(raw);
      // try common property names
      return obj.token || obj.accessToken || obj.jwt || (obj.data && (obj.data.token || obj.data.accessToken));
    } catch (e) {
      // fallthrough to continue processing raw string
    }
  }

  // If it is a string wrapped in quotes from double-JSON-storage, try to parse again
  if (typeof raw === "string" && raw.startsWith('"') && raw.endsWith('"')) {
    try {
      const parsed = JSON.parse(raw);
      return extractTokenFromStoredValue(parsed);
    } catch (e) {
      // not parseable, continue
    }
  }

  // If value starts with Bearer, strip it
  if (typeof raw === "string" && raw.toLowerCase().startsWith("bearer ")) {
    return raw.slice(7).trim();
  }

  // If the stored value is an object already (rare), try extracting fields
  if (typeof raw === "object") {
    return raw.token || raw.accessToken || raw.jwt || null;
  }

  // Otherwise assume it's the token string
  return raw;
}

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("token");
      const token = extractTokenFromStoredValue(raw);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // no token found in storage; don't set Authorization header
      }
    } catch (err) {
      // If anything goes wrong extracting the token, don't block the request
      console.warn("axiosInstance: token extraction error", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
