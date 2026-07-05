// import { useState } from "react";
// import { useEffect } from "react";
// import type { Item } from "@/types/Item";
// import { FridgeItem } from "@/components/FridgeItem";

interface Props {
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

function FridgeItemCheck({ checked, onCheckChange }: Props) {
  return (
    <>
      <input
        type="checkbox"
        name="fridgeItemCheck"
        value=""
        className="m-fridge-detail-item__remove-check"
        checked={checked}
        onChange={(e) => {
          onCheckChange(e.target.checked);
        }}
      ></input>
    </>
  );
}
export default FridgeItemCheck;
