import type { AlartStatus } from "@/types/AlartStatus";

interface Props {
  setAlartSingleStatus: React.Dispatch<React.SetStateAction<AlartStatus>>;
}

function FridgeMoreLink({ setAlartSingleStatus }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAlartSingleStatus("confirm");
  };

  return (
    <button
      type="button"
      className="m-fridge__remove-btn"
      onClick={handleClick}
      // disabled={removeStatus === "loading"}
    >
      削除
    </button>
  );
}
export default FridgeMoreLink;
