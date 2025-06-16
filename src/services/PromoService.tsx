import { BaseService } from "./BaseService";

export class PromoService extends BaseService {
  constructor() {
    super(import.meta.env.VITE_API_URL + "/api/promo");
  }
}
