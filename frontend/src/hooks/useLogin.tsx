import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginStatus = "idle" | "loading" | "success" | "error";

interface LoginParams {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (params: LoginParams) => Promise<void>;
  status: LoginStatus;
  setStatus: React.Dispatch<React.SetStateAction<LoginStatus>>;
}

function useLogin(): UseLoginReturn {
  const [status, setStatus] = useState<LoginStatus>("idle");
  const navigate = useNavigate();

  const login = async ({ email, password }: LoginParams): Promise<void> => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("ログインに失敗しました");
      }

      setStatus("success");
      navigate("/fridges");
    } catch {
      setStatus("error");
    }
  };

  return { login, status, setStatus };
}

export default useLogin;
