import { API } from "./client";

export const registerUser = async (email: string, password: string) => {
  const res = await API.post("/auth/register", { email, password });
  return res.data;
};
