import { useState } from "react";
import type { Status } from "@/types/Status";

interface UpdateFuncProps {
  fridgeId: number;
  itemId: number;
  name: string;
  category: string;
  expirationDate: string;
  quantity: number;
}

function useUpdateFridgeItem() {
  const [statusUpdate, setStatusUpdate] = useState<Status>("idle");
  const update = async ({
    fridgeId,
    itemId,
    name,
    category,
    expirationDate,
    quantity,
  }: UpdateFuncProps): Promise<void> => {
    setStatusUpdate("loading");
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, expirationDate, quantity }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("食材の更新に失敗しました");
      }
      setStatusUpdate("success");
    } catch {
      setStatusUpdate("error");
    }
  };

  return { statusUpdate, update };
}

export default useUpdateFridgeItem;
