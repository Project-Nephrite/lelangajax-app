import type { IListingCreate, IListingResource } from "../interfaces/IListing";
import ValidationError from "../types/ValidationError";
import { APIService } from "./APIService";

export default class ListingService {
  static api: APIService = new APIService(
    import.meta.env.VITE_API_URL + "/listing",
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  public static async search(query: string) {
    return await this.api
      .get(`search?q=${query}`)
      .then((response) => {
        return response.data.data as IListingResource[];
      })
      .catch((error) => {
        throw error;
      });
  }

  public static async myLists(): Promise<IListingResource[]> {
    return await this.api
      .get("myLists")

      .then((response) => {
        return response.data as IListingResource[];
      })

      .catch((error) => {
        if (error.response) throw new Error(error.response.data.message);
        else throw error;
      });
  }

  public static async create(data: IListingCreate) {
    const form = new FormData();

    form.append("name", data.name);
    form.append("description", data.description);
    form.append("value_base", data.value_base.toString());
    form.append("category_id", data.category_id);
    form.append("schema_id", data.schema_id);
    data.images.forEach((file, index) => {
      console.log(file);
      form.append(`images[]`, file);
    });
    console.log(data);

    return await this.api
      .post("create", form)

      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response)
          throw new ValidationError(
            error.response.data.message,
            error.response.status,
          );
        else throw error;
      });
  }

  public static async detail(id: string) {
    return await this.api
      .get(`detail?id=${id}`)
      .then((response) => {
        return response.data as IListingResource;
      })
      .catch((error) => {
        if (error.response) throw new Error(error.response.message);
        else throw error.message;
      });
  }
}
