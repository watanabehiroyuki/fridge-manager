import { useState } from "react";

function useSearchUser() {
  const [searchUsers, setSearchUsers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailGet = async (email: string): Promise<void> => {
    try {
      const res = await fetch(
        `/api/users/search?email=${encodeURIComponent(email)}`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("！ユーザーが見つかりません");
      }

      const data = await res.json();
      setSearchUsers((prev) => [...prev, data.email]);
      setErrorMessage(null);
    } catch (error) {
      setSearchUsers([]);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("エラーが発生しました");
      }
    }
  };
  return { searchUsers, emailGet, errorMessage };
}

export default useSearchUser;
