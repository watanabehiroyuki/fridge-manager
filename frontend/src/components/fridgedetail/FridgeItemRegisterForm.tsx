import type { Status } from "@/types/Status";

interface RegisterFormArgs {
  fridgeId: number;
  name: string;
  category: string;
  expirationDate: string;
  quantity: number;
}
interface Props {
  fridgeId: number;
  onSubmitFridgeItem: (args: RegisterFormArgs) => Promise<void>;
  formId: string;
  setItemForms: React.Dispatch<React.SetStateAction<string[]>>;
  setStatusByItemId: React.Dispatch<
    React.SetStateAction<Record<string, Status>>
  >;
  statusRegister: string;
}

function FridgeItemRegisterForm({
  fridgeId,
  onSubmitFridgeItem,
  formId,
  setItemForms,
  setStatusByItemId,
  statusRegister,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const item = {
      fridgeId: fridgeId,
      name: form.fridgeItemName.value,
      category: form.fridgeItemCategory.value,
      expirationDate: form.fridgeItemExpirationDate.value,
      quantity: Number(form.fridgeItemQuantity.value),
    };
    onSubmitFridgeItem(item);
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItemForms((p) => p.filter((x) => x !== formId));
    setStatusByItemId((prev) => {
      const next = { ...prev };
      delete next[formId];
      return next;
    });
  };

  return (
    <>
      <form className="m-fridge-detail-form" onSubmit={handleSubmit}>
        <div className="m-fridge-detail-form__items">
          <div className="m-fridge-detail-form__item">
            <label htmlFor="" className="m-fridge-detail-form__item-ttl">
              食品名
            </label>
            <input
              type="text"
              name="fridgeItemName"
              placeholder="食品名"
              className="m-fridge-detail-form__item-value"
              required
            ></input>
          </div>
          <div className="m-fridge-detail-form__item">
            <p className="m-fridge-detail-form__item-ttl">カテゴリー</p>
            <select
              name="fridgeItemCategory"
              className="m-fridge-detail-form__item-value"
              required
            >
              <option disabled defaultValue="">
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
          <div className="m-fridge-detail-form__item">
            <label htmlFor="" className="m-fridge-detail-form__item-ttl">
              期限
            </label>
            <input
              type="date"
              name="fridgeItemExpirationDate"
              className="m-fridge-detail-form__item-value"
            ></input>
          </div>
          <div className="m-fridge-detail-form__item">
            <label htmlFor="" className="m-fridge-detail-form__item-ttl">
              数量
            </label>
            <input
              type="number"
              name="fridgeItemQuantity"
              min="1"
              className="m-fridge-detail-form__item-value"
              placeholder="個数"
            ></input>
          </div>
        </div>
        <div className="m-fridge-detail-form__btns">
          <button
            className="m-fridge-detail-form__submit-btn"
            type="submit"
            data-role="register"
            disabled={statusRegister === "loading"}
          >
            登録
          </button>
          <button
            className="m-fridge-detail-form__cancel-btn"
            type="button"
            onClick={handleClickCancel}
          >
            キャンセル
          </button>
        </div>
      </form>
    </>
  );
}
export default FridgeItemRegisterForm;
