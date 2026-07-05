import { useState } from "react";

interface ShareUsers {
  id: number;
  username: string;
  email: string;
  role: string;
}

function useCurrentShareUsers() {
  const [shareUsers, setShareUsers] = useState<ShareUsers[]>([]);

  const shareUsersGet = async (fridgeId: number): Promise<void> => {
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/users`, {
        credentials: "include",
      });

      if (!res.ok) {
        setShareUsers([]);
        return;
      }

      const data = await res.json();

      setShareUsers(data);
    } catch {
      setShareUsers([]);
    }
  };
  return { shareUsers, setShareUsers, shareUsersGet };
}

export default useCurrentShareUsers;
