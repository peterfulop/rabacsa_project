export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};
export interface Category {
  title: string;
  count?: number;
}

export interface ProductDetails {
  title: string;
  price: number;
  description: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
}

export interface AddNewProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
}
export interface UpdateProduct {
  title: string;
  price: number;
  description: string;
}
