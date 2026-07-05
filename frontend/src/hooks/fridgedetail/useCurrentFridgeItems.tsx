import { useState } from "react";
import type { Item } from "@/types/Item";

function useCurrentFridgeItems() {
  const [fridgeDetails, setFridgeDetails] = useState<Item[]>([]);

  const dataGet = async (fridgeId: number) => {
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の中身の情報の取得に失敗しました");
      }

      const data: Item[] = await res.json();

      setFridgeDetails(data);
    } catch {
      setFridgeDetails([]);
    }
  };
  return { fridgeDetails, dataGet };
}

export default useCurrentFridgeItems;
