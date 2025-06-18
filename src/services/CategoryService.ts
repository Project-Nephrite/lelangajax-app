import { APIService } from "./APIService";
import type { Category } from "../interfaces/ICategory";

export default class CategoryService {
  static api = new APIService(import.meta.env.VITE_API_URL + "/category");

  public static async fetch() {
    return await this.api
      .get<Category[]>("/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
