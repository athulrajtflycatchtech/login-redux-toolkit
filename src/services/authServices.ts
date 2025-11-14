/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "./globalServices";

export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  results: {
    access: string;
    refresh: string;
    user_id: number;
    role: string;
    full_name: string;
  };
  message: string;
  status: string;
  statusCode: number;
}


export const loginService = (body: LoginBody): Promise<LoginResponse> => {
  return post("/login/", body);
};
