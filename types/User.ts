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
  owner?:  OwnerLoginResponse;
  administrator?: AdministratorLoginResponse;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message: string;
  status: boolean;
}

export interface OwnerLoginResponse{
  unit_id: string;
  is_verified: boolean;
}

export interface AdministratorLoginResponse{
  condominium: Condominium | null;
}

export interface OwnerUser {
  id: string;
  name: string;
  role: string;
  owner: {
    id: string;
    unit_id: string;
    is_verified: boolean;
  }
}
