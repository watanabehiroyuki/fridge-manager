import { useState } from "react";
import type { Fridge } from "@/types/Fridge";
import type { Status } from "@/types/Status";
import type { AlartStatus } from "@/types/AlartStatus";
import Message from "@/components/Message";
import FridgeListItem from "@/components/fridgelist/FridgeListItem";
import FridgeRemoveAllLink from "@/components/fridgelist/FridgeRemoveAllLink";

interface FridgeProps {
  fridgesData: Fridge[];
  removeStatus: Status;
  removeFunc: (id: number) => Promise<void>;
}

function FridgeList({ fridgesData, removeStatus, removeFunc }: FridgeProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [alartStatus, setAlartStatus] = useState<AlartStatus>("idle");

  const removeFridges = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((f) => f !== id),
    );
  };

  const handleConfirmDelete = async () => {
    setAlartStatus("loading");

    await Promise.all(selectedIds.map((id) => removeFunc(id)));

    setSelectedIds([]);
    setAlartStatus("idle");
  };

  let message: string | null = null;
  message = "冷蔵庫を削除しますか？";

  const action = (
    <p className="m-modal__txt">
      <button onClick={handleConfirmDelete}>削除する</button>
    </p>
  );

  return (
    <>
      {fridgesData.length > 0 ? (
        <ul className="m-fridge__list">
          {fridgesData.map((fridge) => (
            <FridgeListItem
              key={fridge.id}
              fridge={fridge}
              onCheck={removeFridges}
              isChecked={selectedIds.includes(fridge.id)}
              removeFunc={removeFunc}
            />
          ))}
        </ul>
      ) : null}
      <FridgeRemoveAllLink
        removeStatus={removeStatus}
        setAlartStatus={setAlartStatus}
      />
      {(alartStatus === "confirm" || alartStatus === "loading") && (
        <Message
          message={message}
          actions={action}
          onClose={() => setAlartStatus("idle")}
        />
      )}
    </>
  );
}
export default FridgeList;
