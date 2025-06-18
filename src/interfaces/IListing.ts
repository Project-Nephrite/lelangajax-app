export interface IListingCreate {
  name: string;
  description: string;
  value_base: number;
  category_id: string;
  schema_id: string;
  images: File[];
}

export interface IListingResource {
  id: string;
  name: string;
  description: string;
  value_base: number;
  value_current: number;
  status: string;
  bucket_url: string[];
  category_url: string;
  schema_id: string;
  seller_id: string;
}
