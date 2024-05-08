export interface User {
  user_id: string;
  email: string;
  username: string;
  name: string;
  access_token: string;
  image: string;
  shopping_cart: ShoppingCart;
}

export interface ShoppingCart {
  cart_id: string;
  products: ShoppingCartItem[];
}

export interface ShoppingCartItem {
  id?: string;
  quantity: number;
  product: Product;
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
  rating: number;
  discount_percentage: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductSlice {
  featuredProducts: Product[];
  products: Product[];
  popular: Product[];
  categories: Category[];
  product: Product | null;
  loadingProducts: boolean;
  loadingProduct: boolean;
  loadingReviews: boolean;
  loadingFeatured: boolean;
  loadingPopular: boolean;
  loadingCategories: boolean;
  error: object | null;
  lastFetchedProducts: number;
  lastFetchedFeatured: number;
  lastFetchedPopular: number;
}

export interface AuthSlice {
  user: User | null;
  loading: boolean;
  error: string;
  attempttedCurrentUser: boolean;
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
