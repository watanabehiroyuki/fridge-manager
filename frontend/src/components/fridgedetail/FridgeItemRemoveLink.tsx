import type { AlartStatus } from "@/types/AlartStatus";

interface Props {
  setAlartSingleStatus: React.Dispatch<React.SetStateAction<AlartStatus>>;
}

function FridgeItemRemoveLink({ setAlartSingleStatus }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // onRemoveFridgeItem({ fridgeId, itemId });
    setAlartSingleStatus("confirm");
  };

  return (
    <button
      className="m-fridge-detail-item__remove-btn"
      type="button"
      onClick={handleClick}
      data-role="remove"
      // disabled={removeStatus === "loading"}
    >
      削除
    </button>
  );
}
export default FridgeItemRemoveLink;
