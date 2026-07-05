interface Props {
  byDateAscend: boolean;
  onChangeSort: (v: boolean) => void;
}

function FridgeItemSortDate({ byDateAscend, onChangeSort }: Props) {
  return (
    <div className="m-fridge-detail-date">
      <p className="m-fridge-detail-date__ttl">期限順</p>
      <select
        className="m-fridge-detail-date__select"
        name="fridgeItemsSortDate"
        value={byDateAscend ? "昇順" : "降順"}
        onChange={(e) => onChangeSort(e.target.value === "昇順")}
      >
        <option value="昇順">昇順</option>
        <option value="降順">降順</option>
      </select>
    </div>
  );
}
export default FridgeItemSortDate;
