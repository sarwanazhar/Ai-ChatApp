import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API = axios.create({
  baseURL: "https://chatappbackend-tjis.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
