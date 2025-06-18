import { useEffect, useState } from "react";
import type { IListingResource } from "../interfaces/IListing";
import ListingService from "../services/ListingService";

export default function useFetchMyLists(reset?: () => void) {
  const [data, setData] = useState<IListingResource[]>([]);
  useEffect(() => {
    (async () => {
      setData(await ListingService.myLists());
    })();
  }, [reset]);
  return data;
}
