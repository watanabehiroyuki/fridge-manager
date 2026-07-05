import { useState } from "react";
import type { Status } from "@/types/Status";

function useRemoveFridges() {
  const [removeStatus, setRemoveStatus] = useState<Status>("idle");
  const remove = async (fridgeId: number): Promise<void> => {
    setRemoveStatus("loading");
    try {
      const res = await fetch(`/api/fridges/${fridgeId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の削除に失敗しました");
      }
      setRemoveStatus("success");
    } catch {
      setRemoveStatus("error");
    }

    console.log("After remove:", status);
  };

  return { removeStatus, setRemoveStatus, remove };
}

export default useRemoveFridges;
