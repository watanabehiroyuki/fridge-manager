import { useState } from "react";
import type { Status } from "@/types/Status";
interface RegisterFormProps {
  onSubmitFridge: (name: string) => Promise<void>;
  formId: string;
  setForms: React.Dispatch<React.SetStateAction<string[]>>;
  setStatusById: React.Dispatch<React.SetStateAction<Record<string, Status>>>;
  statusRegister: string;
}

function FridgeRegisterForm({
  onSubmitFridge,
  formId,
  setForms,
  setStatusById,
  statusRegister,
}: RegisterFormProps) {
  const [fridgeName, setFridgeName] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmitFridge(fridgeName);
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForms((p) => p.filter((x) => x !== formId));
    setStatusById((prev) => {
      const next = { ...prev };
      delete next[formId];
      return next;
    });
  };

  return (
    <>
      <form className="m-fridge-register-form">
        <div className="m-fridge-register-form__input">
          <label htmlFor="fridgeName">新しい冷蔵庫を追加</label>
          <input
            type="text"
            name="fridgeName"
            placeholder="冷蔵庫名を入力してください"
            value={fridgeName}
            onChange={(e) => {
              setFridgeName(e.target.value);
            }}
          ></input>
        </div>
        <button
          type="button"
          className="m-fridge-register-form__submit"
          onClick={handleClick}
          disabled={statusRegister === "loading"}
        >
          追加
        </button>
        <button
          type="button"
          className="m-fridge-register-form__cancel"
          onClick={handleClickCancel}
        >
          ×
        </button>
      </form>
    </>
  );
}
export default FridgeRegisterForm;
