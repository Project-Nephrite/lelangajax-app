import axios from "axios";
import type { IUserResource } from "../interfaces/IUser";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  email_alt?: string;
  phone: string;
  nik?: string;
  birth_of_date: string;
  home_address?: string;
  profile?: File | null;
  ktp?: File | null;
  verification_key?: string;
}

export interface RegisterResponse {
  user: IUserResource;
  token: string;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/auth",
});

export async function registerService(data: RegisterPayload): Promise<void> {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value);
    }
  });

  return await API.post("/register", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response) throw new Error(error.response.data.message);
      else throw error;
    });
}
