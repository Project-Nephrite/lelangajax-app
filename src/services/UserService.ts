import type { IUserResource } from "../interfaces/IUser";
import { APIService } from "./APIService";

export default class UserService {
  private static api = new APIService(import.meta.env.VITE_API_URL + "/user");

  public static async detail(id: string) {
    return await this.api
      .get(`detail?id=${id}`)

      .then((response) => {
        return response.data as IUserResource;
      })
      .catch((error) => {
        if (error.response) throw new Error(error.response.message);
        else throw error;
      });
  }
}
