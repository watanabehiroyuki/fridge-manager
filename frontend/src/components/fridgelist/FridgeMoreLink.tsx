import { Link } from "react-router-dom";
import type { Fridge } from "@/types/Fridge";

interface FridgeProps {
  fridge: Fridge;
}

function FridgeMoreLink({ fridge }: FridgeProps) {
  return (
    <Link
      to={`/fridges/${fridge.id}`}
      state={{ fridge }}
      className="m-fridge__more-link"
    >
      詳細へ
    </Link>
  );
}
export default FridgeMoreLink;
