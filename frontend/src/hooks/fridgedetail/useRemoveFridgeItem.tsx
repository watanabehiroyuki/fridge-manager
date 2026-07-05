import { useState } from "react";
import type { Status } from "@/types/Status";

interface RemoveFuncProps {
  fridgeId: number;
  itemId: number;
}

function useRemoveFridgeItem() {
  const [statusRemove, setStatusRemove] = useState<Status>("idle");
  const remove = async ({
    fridgeId,
    itemId,
  }: RemoveFuncProps): Promise<void> => {
    setStatusRemove("loading");
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の削除に失敗しました");
      }
      setStatusRemove("success");
    } catch {
      setStatusRemove("error");
    }
  };

  return { statusRemove, remove };
}

export default useRemoveFridgeItem;
