import { useEffect, useState } from "react";
import type { Category } from "../interfaces/ICategory";
import CategoryService from "../services/CategoryService";
/**
 * Fetch all categories
 * @returns {Category[]} categories in array
 */
export default function useFetchCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const data = await CategoryService.fetch();
      setCategories(data);
    })();
  }, []);

  return categories;
}
