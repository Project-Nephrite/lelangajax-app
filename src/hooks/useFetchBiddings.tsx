import { useEffect, useState } from "react";
import { type IBidResource } from "../interfaces/IBid";
import BidService from "../services/BidService";

export default function useFetchBiddings(listing_id: string) {
  const [data, setData] = useState<IBidResource[]>([]);

  useEffect(() => {
    if (!listing_id) {
      return;
    }
    (async () => {
      setData(await BidService.fetchBiddings(listing_id));
    })();
  }, [listing_id]);
  return data;
}
