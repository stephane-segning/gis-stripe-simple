export interface ProductCardProps {
  email: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  quantity?: number;
  recurring_interval?: 'day' | 'week' | 'month' | 'year';
  redirectPath?: string;
  currency: 'usd' | 'cad' | 'xaf' | 'eur';
}