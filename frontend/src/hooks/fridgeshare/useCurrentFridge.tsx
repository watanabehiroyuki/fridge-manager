import { useState } from "react";

function useCurrentFridge() {
  const [fridgeName, setFridgeName] = useState<string>("");

  const fridgeNameGet = async (fridgeId: number): Promise<void> => {
    try {
      const res = await fetch(`/api/fridges/${fridgeId}`, {
        credentials: "include",
      });

      if (!res.ok) {
        setFridgeName("");
        return;
      }

      const data = await res.json();

      setFridgeName(data.name);
    } catch {
      setFridgeName("");
    }
  };
  return { fridgeName, fridgeNameGet };
}

export default useCurrentFridge;
