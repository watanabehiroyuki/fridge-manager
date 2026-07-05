import type { Status } from "@/types/Status";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useCurrentFridge from "@/hooks/fridgeshare/useCurrentFridge";
import useCurrentFridgeItems from "@/hooks/fridgedetail/useCurrentFridgeItems";
import useRegisterFridgeItem from "@/hooks/fridgedetail/useRegisterFridgeItem";
import useRemoveFridgeItem from "@/hooks/fridgedetail/useRemoveFridgeItem";
import FridgeItemList from "@/components/fridgedetail/FridgeItemList";
import FridgeItemRegisterForm from "@/components/fridgedetail/FridgeItemRegisterForm";
import FridgeItemSortCategory from "@/components/fridgedetail/FridgeItemSortCategory";
import FridgeItemRegisterButton from "@/components/fridgedetail/FridgeItemRegisterButton";

interface RegisterFormArgs {
  fridgeId: number;
  name: string;
  category: string;
  expirationDate: string;
  quantity: number;
}

function FridgeDetailPage() {
  const { fridgeName, fridgeNameGet } = useCurrentFridge();
  const { fridgeId } = useParams<{ fridgeId: string }>();
  const { fridgeDetails, dataGet } = useCurrentFridgeItems();
  const { register } = useRegisterFridgeItem();
  const { statusRemove, remove } = useRemoveFridgeItem();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "全て",
  ]);
  const [byDateAscend, setByDateAscend] = useState(true);
  const [itemForms, setItemForms] = useState<string[]>([]);
  const [statusByItemId, setStatusByItemId] = useState<Record<string, Status>>(
    {},
  );

  useEffect(() => {
    if (!fridgeId) return;
    fridgeNameGet(Number(fridgeId));
  }, [fridgeId]);

  useEffect(() => {
    if (!fridgeId) return;
    dataGet(Number(fridgeId));
  }, [fridgeId]);

  useEffect(() => {
    if (statusRemove === "success") {
      dataGet(Number(fridgeId));
    }
  }, [statusRemove]);

  // const handleRegister = async (args: RegisterFormArgs) => {
  //   const ok = await register(args);
  //   if (ok) {
  //     dataGet(Number(fridgeId));
  //   }
  // };

  const registerByItemId = async (id: string, args: RegisterFormArgs) => {
    setStatusByItemId((p) => ({ ...p, [id]: "loading" }));
    try {
      await register(args);
      setStatusByItemId((p) => ({ ...p, [id]: "success" }));
      setItemForms((p) => p.filter((x) => x !== id));
      dataGet(Number(fridgeId));
    } catch {
      setStatusByItemId((p) => ({ ...p, [id]: "error" }));
    }
  };

  type ToggleCategoryFn = (category: string, checked: boolean) => void;
  const toggleCategory: ToggleCategoryFn = (category, checked) => {
    setSelectedCategories((prev) => {
      // 「全て」をON → 他は全部解除して「全て」だけ
      if (category === "全て") {
        return checked ? ["全て"] : [];
      }

      // 他カテゴリをON → 「全て」は外す
      const withoutAll = prev.filter((c) => c !== "全て");
      if (checked) return [...withoutAll, category];

      // OFF
      const next = withoutAll.filter((c) => c !== category);

      // 何も残らなかったら「全て」に戻す（好みで）
      return next.length === 0 ? ["全て"] : next;
    });
  };

  return (
    <div className="m-fridge-detail">
      <div className="m-fridge-detail__head">
        <div className="m-fridge-detail__top-ttl">
          <Link to="/fridges" className="m-fridge-detail__back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="69.296"
              viewBox="0 0 200 69.296"
            >
              <path
                d="M127.794,268.963a7.693,7.693,0,0,0-4.3,13.878L176.1,322.866H14.31a7.694,7.694,0,1,0,0,15.388H198.919a7.693,7.693,0,0,0,4.662-13.815l-70.767-53.846A7.693,7.693,0,0,0,127.794,268.963Z"
                transform="translate(-6.616 -268.958)"
              />
            </svg>
          </Link>
          <h1 className="m-fridge-detail__ttl">
            {fridgeName}
            <br />
            <span>{fridgeDetails.length}個の食材</span>
          </h1>
        </div>
        <FridgeItemRegisterButton
          setItemForms={setItemForms}
          setStatusByItemId={setStatusByItemId}
        />
      </div>
      <div className="m-fridge-detail__main">
        <FridgeItemSortCategory
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          byDateAscend={byDateAscend}
          onChangeSort={setByDateAscend}
        />
        {itemForms.map((id) => (
          <FridgeItemRegisterForm
            key={id}
            fridgeId={Number(fridgeId)}
            onSubmitFridgeItem={(args) => registerByItemId(id, args)}
            formId={id}
            setItemForms={setItemForms}
            setStatusByItemId={setStatusByItemId}
            statusRegister={statusByItemId[id] ?? "idle"}
          />
        ))}
        <FridgeItemList
          fridgeDetails={fridgeDetails}
          fridgeId={Number(fridgeId)}
          removeFunc={remove}
          statusRemove={statusRemove}
          selectedCategories={selectedCategories}
          byDateAscend={byDateAscend}
        />
      </div>
    </div>
  );
}
export default FridgeDetailPage;
