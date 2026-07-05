import { useState } from "react";

interface ShareUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

function useShareUser() {
  const [shareUserState, setShareUserState] = useState(false);

  const emailPost = async (
    fridgeId: number,
    email: string,
  ): Promise<ShareUser[]> => {
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("冷蔵庫の共有に失敗しました");
      }

      const { users } = await res.json();
      setShareUserState(true);
      return users;
    } catch (error) {
      setShareUserState(false);
      throw error;
    }
  };
  return { shareUserState, emailPost };
}

export default useShareUser;
