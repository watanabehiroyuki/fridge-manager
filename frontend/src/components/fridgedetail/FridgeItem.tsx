import { useState } from "react";
import { useEffect } from "react";
import type { AlartStatus } from "@/types/AlartStatus";
import useUpdateFridgeItem from "@/hooks/fridgedetail/useUpdateFridgeItem";
import FridgeItemCheck from "@/components/fridgedetail/FridgeItemCheck";
import FridgeItemRemoveLink from "@/components/fridgedetail/FridgeItemRemoveLink";
import Message from "@/components/Message";

type OnCheck = (id: number, checked: boolean) => void;

interface RemoveFuncArgs {
  fridgeId: number;
  itemId: number;
}
interface Props {
  fridgeId: number;
  itemId: number;
  itemName: string;
  itemCategory: string;
  itemExpirationDate: string;
  itemQuantity: number;
  removeFunc: (args: RemoveFuncArgs) => Promise<void>;
  onCheck: OnCheck;
  isChecked: boolean;
}

function FridgeItem({
  fridgeId,
  itemId,
  itemName,
  itemCategory,
  itemExpirationDate,
  itemQuantity,
  removeFunc,
  onCheck,
  isChecked,
}: Props) {
  const { statusUpdate, update } = useUpdateFridgeItem();
  const [form, setForm] = useState({
    name: itemName,
    category: itemCategory,
    expirationDate: itemExpirationDate,
    quantity: itemQuantity,
  });
  const [alartSingleStatus, setAlartSingleStatus] =
    useState<AlartStatus>("idle");

  useEffect(() => {
    setForm({
      name: itemName,
      category: itemCategory,
      expirationDate: itemExpirationDate,
      quantity: itemQuantity,
    });
  }, [itemName, itemCategory, itemExpirationDate, itemQuantity]);

  const [isEditing, setIsEditing] = useState(false);
  const [prevForm, setPrevForm] = useState<typeof form | null>(null);

  const startEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPrevForm(form);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      await update({ fridgeId, itemId, ...form });
      setPrevForm(null);
    } catch {
      // 失敗したら元に戻す
      if (prevForm) {
        setForm(prevForm);
        setIsEditing(true);
      }
    }
  };

  const handleConfirmDelete = async () => {
    setAlartSingleStatus("loading");
    await removeFunc({ fridgeId, itemId });
    setAlartSingleStatus("idle");
  };

  let message: string | null = null;
  message = "冷蔵庫を削除しますか？";

  const action = (
    <p className="m-modal__txt">
      <button onClick={handleConfirmDelete}>削除する</button>
    </p>
  );

  const now = new Date();
  const [year, month, day] = form.expirationDate.split("-").map(Number);
  const expirationDateNew = new Date(year, month - 1, day, 23, 59, 59);
  const isExpired = now > expirationDateNew;

  return (
    <>
      {isEditing && (
        <form className="m-fridge-detail-form" onSubmit={handleSubmit}>
          <div className="m-fridge-detail-form__inner">
            <label className="m-fridge-detail-form__item">
              <span className="m-fridge-detail-form__item-ttl">食品名</span>
              <input
                type="text"
                name="fridgeItemName"
                placeholder="食品名"
                className="m-fridge-detail-form__item-value"
                value={form.name}
                disabled={!isEditing}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              ></input>
            </label>
            <div className="m-fridge-detail-form__item">
              <span className="m-fridge-detail-form__item-ttl">カテゴリー</span>
              <select
                name="fridgeItemCategory"
                className="m-fridge-detail-form__item-value"
                value={form.category}
                disabled={!isEditing}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="" disabled defaultValue="">
                  カテゴリー
                </option>
                <option value="野菜・果物">野菜・果物</option>
                <option value="肉・魚">肉・魚</option>
                <option value="乳製品・大豆製品">乳製品・大豆製品</option>
                <option value="調味料・ソース">調味料・ソース</option>
                <option value="飲み物・デザート">飲み物・デザート</option>
                <option value="常備食・乾物系">常備食・乾物系</option>
                <option value="主食">主食</option>
                <option value="手作り・作り置き">手作り・作り置き</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <label className="m-fridge-detail-form__item">
              <span className="m-fridge-detail-form__item-ttl">数量</span>
              <input
                type="number"
                name="fridgeItemQuantity"
                min="1"
                className="m-fridge-detail-form__item-value"
                placeholder="個数"
                value={form.quantity}
                disabled={!isEditing}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
              ></input>
            </label>
            <label
              htmlFor="fridgeItemExpirationDate"
              className="m-fridge-detail-form__item"
            >
              <span className="m-fridge-detail-form__item-ttl">期限</span>
              <input
                type="date"
                name="fridgeItemExpirationDate"
                id="fridgeItemExpirationDate"
                className="m-fridge-detail-form__item-value"
                value={form.expirationDate}
                disabled={!isEditing}
                onChange={(e) =>
                  setForm({ ...form, expirationDate: e.target.value })
                }
              ></input>
            </label>
          </div>
          <button
            className="m-fridge-detail-form__submit-btn"
            type="submit"
            data-role="update"
            data-disabled={statusUpdate === "loading" ? true : undefined}
          >
            保存
          </button>
        </form>
      )}

      {!isEditing && (
        <div className="m-fridge-detail-item">
          <FridgeItemCheck
            onCheckChange={(checked) => onCheck(itemId, checked)}
            checked={isChecked}
          />
          <div className="m-fridge-detail-item__inner">
            <p className="m-fridge-detail-item__category">{form.category}</p>
            <p className="m-fridge-detail-item__name">{form.name}</p>
            <div className="m-fridge-detail-item__column">
              <p className="m-fridge-detail-item__quantity">
                数量: {form.quantity} 個
              </p>
              <p className="m-fridge-detail-item__date">
                {form.expirationDate}
              </p>
              {isExpired && (
                <p className="m-fridge-detail-item__expired">期限切れ</p>
              )}
            </div>
          </div>
          <div className="m-fridge-detail-item__btns">
            <button
              className="m-fridge-detail-item__edit-btn"
              type="button"
              onClick={startEdit}
              data-role="edit"
            >
              編集
            </button>
            <FridgeItemRemoveLink setAlartSingleStatus={setAlartSingleStatus} />
          </div>
        </div>
      )}

      {(alartSingleStatus === "confirm" || alartSingleStatus === "loading") && (
        <Message
          message={message}
          actions={action}
          onClose={() => setAlartSingleStatus("idle")}
        />
      )}
    </>
  );
}
export default FridgeItem;
