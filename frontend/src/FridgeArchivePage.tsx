import { useEffect } from "react";
import Message from "@/components/Message";
import FridgeRegisterBloc from "@/components/fridgelist/FridgeRegisterBloc";
import useCurrentFridges from "@/hooks/fridgelist/useCurrentFridges";
import useRemoveFridges from "@/hooks/fridgelist/useRemoveFridges";
import useRegisterFridges from "@/hooks/fridgelist/useRegisterFridges";
import FridgeList from "@/components/fridgelist/FridgeList";

function FridgeArchivePage() {
  const { fridges, setFridges, dataGet } = useCurrentFridges();
  const { removeStatus, setRemoveStatus, remove } = useRemoveFridges();
  const { register } = useRegisterFridges();

  const message =
    removeStatus === "error" ? "冷蔵庫の削除に失敗しました" : null;

  useEffect(() => {
    dataGet();
  }, []);

  const removeNew = async (id: number) => {
    const prevUsers = fridges;
    try {
      await remove(id);
      setFridges((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setFridges(prevUsers);
    }
  };

  return (
    <div className="m-fridge">
      <h1 className="m-fridge__top-ttl">冷蔵庫一覧</h1>
      <FridgeRegisterBloc registerFunc={register} onRegistered={dataGet} />
      <FridgeList
        fridgesData={fridges}
        removeStatus={removeStatus}
        removeFunc={removeNew}
      />
      {message && (
        <Message message={message} onClose={() => setRemoveStatus("idle")} />
      )}
    </div>
  );
}

export default FridgeArchivePage;
