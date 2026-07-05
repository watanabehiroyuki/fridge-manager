interface Items {
  id: number;
  name: string;
  category: string;
  quantity: number;
  expirationDate: string;
}

interface Users {
  id: number;
  username: string;
  role: string;
}

export interface Fridge {
  id: number;
  name: string;
  items: Items[];
  users: Users[];
}
