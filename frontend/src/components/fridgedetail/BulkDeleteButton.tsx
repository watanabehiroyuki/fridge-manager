import type { Status } from "@/types/Status";
import type { AlartStatus } from "@/types/AlartStatus";

interface Props {
  statusRemove: Status;
  setAlartStatus: React.Dispatch<React.SetStateAction<AlartStatus>>;
}

function BulkDeleteButton({ statusRemove, setAlartStatus }: Props) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await Promise.all(
    //   fridgeItems.map((itemId) => removeFunc({ fridgeId, itemId }))
    // );
    setAlartStatus("confirm");
  };

  return (
    <button
      type="button"
      className="m-fridge__remove-all-btn"
      onClick={handleClick}
      disabled={statusRemove === "loading"}
    >
      一括削除
    </button>
  );
}
export default BulkDeleteButton;
