export interface BuyProductCardProps {
  email: string;
  product_name: string;
  product_price?: number;
  product_description?: string;
  product_images?: string[];
  product_quantity?: number;
  recurring_interval?: 'day' | 'week' | 'month' | 'year';
  redirectPath?: string;
  currency?: 'usd' | 'cad' | 'xaf' | 'eur';
}