interface Props {
  checked: boolean;
}
function FridgeItemEditButton({ checked }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    checked = !!checked;
  };

  return (
    <button
      className="m-fridge-detail-form__switch-btn m-fridge-detail-table__edit-btn"
      type="button"
      onClick={handleClick}
    >
      編集
    </button>
  );
}
export default FridgeItemEditButton;
