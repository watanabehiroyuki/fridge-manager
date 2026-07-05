import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Fridge } from "@/types/Fridge";
import type { AlartStatus } from "@/types/AlartStatus";
import Message from "@/components/Message";
import FridgeUser from "@/components/fridgelist/FridgeUser";
import FridgeRemoveLink from "@/components/fridgelist/FridgeRemoveLink";
import FridgeRemoveAllCheck from "@/components/fridgelist/FridgeRemoveAllCheck";

type OnCheck = (id: number, checked: boolean) => void;

interface FridgeProps {
  fridge: Fridge;
  onCheck: OnCheck;
  isChecked: boolean;
  removeFunc: (id: number) => Promise<void>;
}

function FridgeListItem({
  fridge,
  onCheck,
  isChecked,
  removeFunc,
}: FridgeProps) {
  const navigate = useNavigate();
  const ownerUsers = fridge.users.filter((user) => user.role === "OWNER");
  const memberUsers = fridge.users.filter((user) => user.role === "MEMBER");
  const [alartSingleStatus, setAlartSingleStatus] =
    useState<AlartStatus>("idle");

  const handleConfirmDelete = async () => {
    setAlartSingleStatus("loading");
    await removeFunc(fridge.id);
    setAlartSingleStatus("idle");
  };

  let message: string | null = null;
  message = "冷蔵庫を削除しますか？";

  const action = (
    <p className="m-modal__txt">
      <button onClick={handleConfirmDelete}>削除する</button>
    </p>
  );

  return (
    <>
      <li className="m-fridge-card">
        <FridgeRemoveAllCheck
          onCheckChange={(checked) => onCheck(fridge.id, checked)}
          checked={isChecked}
        />
        <Link to={`/fridges/${fridge.id}`} className="m-fridge-card__inner">
          <div className="m-fridge-card__head">
            <div className="m-fridge-card__outline">
              <p className="icn"></p>
              <p className="txts">
                <span className="m-fridge-card__name">{fridge.name}</span>
                <span className="m-fridge-card__items">
                  {fridge.items.length}個の食材
                </span>
              </p>
            </div>
          </div>
          <div className="m-fridge-card__users">
            <div className="m-fridge-card__users-list">
              <div className="m-fridge-card__users-item">
                <p className="m-fridge-card__users-txt">オーナー：</p>
                {ownerUsers.map((owner) => (
                  <FridgeUser
                    key={owner.id}
                    name={owner.username}
                    id={owner.id}
                    role={owner.role}
                    fridgeId={fridge.id}
                  />
                ))}
              </div>
              <div className="m-fridge-card__users-item">
                <p className="m-fridge-card__users-txt">メンバー：</p>
                <div className="m-fridge-card__users-members">
                  {memberUsers.map((member) => (
                    <FridgeUser
                      key={member.id}
                      name={member.username}
                      id={member.id}
                      role={member.role}
                      fridgeId={fridge.id}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="m-fridge-card__users-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/fridges/${fridge.id}/share`);
              }}
            >
              共有
            </button>
          </div>
          <FridgeRemoveLink setAlartSingleStatus={setAlartSingleStatus} />
        </Link>
      </li>
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
export default FridgeListItem;
