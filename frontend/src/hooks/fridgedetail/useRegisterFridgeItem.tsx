import { useState } from "react";
import type { Status } from "@/types/Status";

interface RegisterFormArgs {
  fridgeId: number;
  name: string;
  category: string;
  expirationDate: string;
  quantity: number;
}

function useRegisterFridgeItem() {
  const [statusRegister, setStatusRegister] = useState<Status>("idle");

  const register = async ({
    fridgeId,
    name,
    category,
    expirationDate,
    quantity,
  }: RegisterFormArgs) => {
    setStatusRegister("loading");
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, expirationDate, quantity }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の中身の情報の取得に失敗しました");
      }

      setStatusRegister("success");
      return true;
    } catch {
      setStatusRegister("error");
      return false;
    }
  };
  return { statusRegister, register };
}

export default useRegisterFridgeItem;
