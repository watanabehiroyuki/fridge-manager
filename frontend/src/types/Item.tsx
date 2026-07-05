export interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
  expirationDate: string;
  last_notified_date: string;
  consumed: number;
  fridge_id: number;
}
