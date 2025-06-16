import { BaseService } from "./BaseService";
import type { Category } from "../interfaces/ICategory";

class CategoryService extends BaseService {
  constructor() {
    super(import.meta.env.VITE_API_URL + "/category");
  }

  public async fetch() {
    return await this.get<Category[]>("/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new CategoryService();
