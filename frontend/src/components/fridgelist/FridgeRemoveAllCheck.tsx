interface Props {
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

function FridgeRemoveAllCheck({ checked, onCheckChange }: Props) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        onCheckChange(e.target.checked);
      }}
      className="m-fridge-card__check"
    />
  );
}

export default FridgeRemoveAllCheck;
