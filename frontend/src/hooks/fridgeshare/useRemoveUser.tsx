import { useState } from "react";
import type { Status } from "@/types/Status";

function useRemoveUser() {
  const [removeStatus, setRemoveStatus] = useState<Status>("idle");
  const remove = async (userId: number, fridgeId: number): Promise<void> => {
    setRemoveStatus("loading");
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("共有ユーザーの解除に失敗しました");
      }
      setRemoveStatus("success");
    } catch {
      setRemoveStatus("error");
    }
  };

  return { removeStatus, remove };
}

export default useRemoveUser;
