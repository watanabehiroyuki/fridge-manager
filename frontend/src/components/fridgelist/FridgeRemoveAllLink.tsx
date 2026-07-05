import type { Status } from "@/types/Status";
import type { AlartStatus } from "@/types/AlartStatus";

interface Props {
  removeStatus: Status;
  setAlartStatus: React.Dispatch<React.SetStateAction<AlartStatus>>;
}

function FridgeRemoveAllLink({ removeStatus, setAlartStatus }: Props) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAlartStatus("confirm");
  };

  return (
    <button
      type="button"
      className="m-fridge__remove-all-btn"
      onClick={handleClick}
      disabled={removeStatus === "loading"}
    >
      一括削除
    </button>
  );
}
export default FridgeRemoveAllLink;
