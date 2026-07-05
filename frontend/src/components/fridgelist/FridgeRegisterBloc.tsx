import { useState } from "react";
import type { Status } from "@/types/Status";
import FridgeRegisterForm from "@/components/fridgelist/FridgeRegisterForm";

interface Props {
  registerFunc: (name: string) => Promise<void>;
  onRegistered: () => void;
}

function FridgeRegisterBloc({ registerFunc, onRegistered }: Props) {
  const [forms, setForms] = useState<string[]>([]);
  const [statusById, setStatusById] = useState<Record<string, Status>>({});

  const addForm = () => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    setForms((p) => [...p, id]);
    setStatusById((p) => ({ ...p, [id]: "idle" }));
  };

  const registerById = async (id: string, name: string) => {
    setStatusById((p) => ({ ...p, [id]: "loading" }));
    try {
      await registerFunc(name);
      setStatusById((p) => ({ ...p, [id]: "success" }));
      setForms((p) => p.filter((x) => x !== id));
      onRegistered();
    } catch {
      setStatusById((p) => ({ ...p, [id]: "error" }));
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addForm();
  };

  return (
    <div className="m-fridge-register">
      {forms.map((id) => (
        <FridgeRegisterForm
          key={id}
          onSubmitFridge={(name) => registerById(id, name)}
          formId={id}
          setForms={setForms}
          setStatusById={setStatusById}
          statusRegister={statusById[id] ?? "idle"}
        />
      ))}
      <button
        type="button"
        className="m-fridge-register__show-btn"
        onClick={handleClick}
      >
        冷蔵庫を追加
      </button>
    </div>
  );
}
export default FridgeRegisterBloc;
