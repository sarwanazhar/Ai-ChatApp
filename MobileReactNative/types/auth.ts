export interface User {
  id: string;
  email: string;
  // add other fields your Go backend returns
}

export interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginResponse {
  token: string;
  user: User;
}