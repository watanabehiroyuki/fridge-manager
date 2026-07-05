import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LogoutStatus = "idle" | "loading" | "success" | "error";

function useLogout() {
  const [status, setStatus] = useState<LogoutStatus>("idle");
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("ログアウトに失敗しました");
      }

      setStatus("success");
      navigate("/login");
    } catch {
      setStatus("error");
    }
  };

  return { status, logout };
}

export default useLogout;
