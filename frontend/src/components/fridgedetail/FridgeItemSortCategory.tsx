import FridgeItemSortDate from "@/components/fridgedetail/FridgeItemSortDate";
type ToggleCategoryFn = (category: string, checked: boolean) => void;

interface Props {
  selectedCategories: string[];
  toggleCategory: ToggleCategoryFn;
  byDateAscend: boolean;
  onChangeSort: (v: boolean) => void;
}

function FridgeItemSortCategory({
  selectedCategories,
  toggleCategory,
  byDateAscend,
  onChangeSort,
}: Props) {
  return (
    <div className="m-fridge-detail-sort">
      <p className="m-fridge-detail-sort__ttl">カテゴリーフィルター</p>
      <ul className="m-fridge-detail-sort__list">
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortAll"
            name="fridgeItemsSortAll"
            value="全て"
            checked={selectedCategories.includes("全て")}
            onChange={(e) => toggleCategory("全て", e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortAll">全て</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortVege"
            name="fridgeItemsSortVege"
            value="野菜・果物"
            checked={selectedCategories.includes("野菜・果物")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortVege">野菜・果物</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortMeatfish"
            name="fridgeItemsSortMeatfish"
            value="肉・魚"
            checked={selectedCategories.includes("肉・魚")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortMeatfish">肉・魚</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsDairySoy"
            name="fridgeItemsDairySoy"
            value="乳製品・大豆製品"
            checked={selectedCategories.includes("乳製品・大豆製品")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsDairySoy">乳製品・大豆製品</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortSource"
            name="fridgeItemsSortSource"
            value="調味料・ソース"
            checked={selectedCategories.includes("調味料・ソース")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSource">調味料・ソース</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortDessert"
            name="fridgeItemsSortDessert"
            value="飲み物・デザート"
            checked={selectedCategories.includes("飲み物・デザート")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortDessert">飲み物・デザート</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortStock"
            name="fridgeItemsSortStock"
            value="常備食・乾物系"
            checked={selectedCategories.includes("常備食・乾物系")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortStock">常備食・乾物系</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortStaple"
            name="fridgeItemsSortStaple"
            value="主食"
            checked={selectedCategories.includes("主食")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortStaple">主食</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortHandmade"
            name="fridgeItemsSortHandmade"
            value="手作り・作り置き"
            checked={selectedCategories.includes("手作り・作り置き")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortHandmade">手作り・作り置き</label>
        </li>
        <li className="m-fridge-detail-sort__item">
          <input
            type="checkbox"
            id="fridgeItemsSortOther"
            name="fridgeItemsSortOther"
            value="その他"
            checked={selectedCategories.includes("その他")}
            onChange={(e) => toggleCategory(e.target.value, e.target.checked)}
          ></input>
          <label htmlFor="fridgeItemsSortOther">その他</label>
        </li>
      </ul>
      <FridgeItemSortDate
        byDateAscend={byDateAscend}
        onChangeSort={onChangeSort}
      />
    </div>
  );
}
export default FridgeItemSortCategory;
