import type { IBidCreate, IBidResource } from "../interfaces/IBid";
import { APIService } from "./APIService";

export default class BidService {
  static api = new APIService(import.meta.env.VITE_API_URL + "/bid");

  public static async fetchBiddings(listing_id: string) {
    return await this.api
      .get(`fetch?id=${listing_id}`)
      .then((response) => {
        return response.data as IBidResource[];
      })
      .catch((error) => {
        if (error.response) throw new Error(error.response.data.message);
        else throw error;
      });
  }

  public static async registerBid(data: IBidCreate, id: string) {
    const form = new FormData();
    form.append("value", data.value.toString());
    form.append("listing_id", data.listing_id);
    form.append("user_id", id);

    return await this.api
      .post("register", form)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        if (error.response) throw new Error(error.response.data.message);
        else throw error;
      });
  }
}
