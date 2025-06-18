import { useEffect, useState } from "react";
import type { IListingResource } from "../interfaces/IListing";
import ListingService from "../services/ListingService";

export default function useFetchLists(query: string = "") {
  const [data, setData] = useState<IListingResource[]>([]);

  useEffect(() => {
    (async () => {
      setData(await ListingService.search(query));
    })();
  }, [query]);
  return data;
}
