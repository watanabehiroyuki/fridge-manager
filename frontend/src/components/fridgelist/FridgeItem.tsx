interface FridgeItemProps {
  name: string;
  category: string;
}

function FridgeItem({ name, category }: FridgeItemProps) {
  const categoryClass =
    category === "野菜・果物"
      ? "--vege"
      : category === "肉・魚"
      ? "--meatfish"
      : category === "乳製品・大豆製品"
      ? "--dairysoy"
      : category === "調味料・ソース"
      ? "--source"
      : category === "飲み物・デザート"
      ? "--dessert"
      : category === "常備食・乾物系"
      ? "--stock"
      : category === "主食"
      ? "-staple"
      : category === "手作り・作り置き"
      ? "-handmade"
      : category === "その他"
      ? "-other"
      : null;

  return (
    <li className={`m-fridge-items__li${categoryClass}`}>
      <span></span>
      {name}
    </li>
  );
}
export default FridgeItem;
