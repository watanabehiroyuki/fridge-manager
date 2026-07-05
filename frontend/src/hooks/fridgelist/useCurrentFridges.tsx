import { useState } from "react";

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

function useCurrentFridges() {
  const [fridges, setFridges] = useState<Fridge[]>([]);

  const dataGet = async () => {
    try {
      const res = await fetch(`/api/fridges/with-details`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の情報の取得に失敗しました");
      }

      const data: Fridge[] = await res.json();

      setFridges(data);
    } catch {
      setFridges([]);
    }
  };
  return { fridges, setFridges, dataGet };
}

export default useCurrentFridges;
