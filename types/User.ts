import type { Condominium } from "./Condominium";

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  status: boolean;
  condominium: Condominium | null;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message: string;
  status: boolean;
}
