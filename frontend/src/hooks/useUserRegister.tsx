import { useState } from "react";

type RegisterStatus = "idle" | "loading" | "success" | "error" | "conflict";

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterReturn {
  status: RegisterStatus;
  register: (params: RegisterParams) => Promise<void>;
  reset: () => void;
}

function useUserRegister(): UseRegisterReturn {
  const [status, setStatus] = useState<RegisterStatus>("idle");

  const register = async ({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterParams): Promise<void> => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      if (res.status === 409) {
        setStatus("conflict");
        return;
      }
      if (!res.ok) {
        throw new Error("ユーザーの登録に失敗しました");
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
  };

  return { status, register, reset };
}

export default useUserRegister;
