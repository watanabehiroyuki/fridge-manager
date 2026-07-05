import type { Status } from "@/types/Status";

interface Props {
  setItemForms: React.Dispatch<React.SetStateAction<string[]>>;
  setStatusByItemId: React.Dispatch<
    React.SetStateAction<Record<string, Status>>
  >;
}

function FridgeItemRegisterButton({ setItemForms, setStatusByItemId }: Props) {
  const addForm = () => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    setItemForms((p) => [...p, id]);
    setStatusByItemId((p) => ({ ...p, [id]: "idle" }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addForm();
  };

  return (
    <button
      type="button"
      className="m-fridge-detail__register-btn"
      onClick={handleClick}
    >
      追加
    </button>
  );
}
export default FridgeItemRegisterButton;
