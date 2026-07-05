import { useState } from "react";
import type { Status } from "@/types/Status";

function useRegisterFridges() {
  const [statusRegister, setStatusRegister] = useState<Status>("idle");
  const register = async (name: string): Promise<void> => {
    setStatusRegister("loading");
    try {
      const res = await fetch("/api/fridges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の登録に失敗しました");
      }
      setStatusRegister("success");
    } catch {
      setStatusRegister("error");
    }
  };

  return { statusRegister, register };
}

export default useRegisterFridges;
