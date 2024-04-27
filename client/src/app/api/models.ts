export interface User {
  user_id: string;
  email: string;
  username: string;
  name: string;
  access_token: string;
  image: string;
}

export interface Review {
  user_id: string;
  rating: number;
  created_at: Date;
  product_id: string;
  id: string;
  review_String: string;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  description: string;
  category_id: string;
  stock: number;
  availability: boolean;
  images: Array<{
    image: string;
    id: string;
  }>;
  reviews: Pagination<Review>;
}

export interface ProductSlice {
  products: Product[];
  product: Product | null;
  loadingProducts: boolean;
  loadingProduct: boolean;
  loadingReviews: boolean;
  error: string;
  lastFetchedProducts: number;
}

export type Pagination<T> = Partial<{
  itemCount: number;
  content: T[];
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  perPage: number;
  pageCount: number;
}>;
