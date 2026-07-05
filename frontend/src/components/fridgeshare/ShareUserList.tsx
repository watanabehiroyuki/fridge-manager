import { useState } from "react";
import type { AlartStatus } from "@/types/AlartStatus";
import ShareUserItem from "@/components/fridgeshare/ShareUserItem";
import Message from "@/components/Message";

interface ShareUsers {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Props {
  shareUsers: ShareUsers[];
  onDelete: (userId: number) => Promise<void>;
}

function ShareUserList({ shareUsers, onDelete }: Props) {
  const [targetUserId, setTargetUserId] = useState<number | null>(null);
  const [alartSingleStatus, setAlartSingleStatus] =
    useState<AlartStatus>("idle");

  const handleConfirmDelete = async () => {
    if (targetUserId === null) return;

    setAlartSingleStatus("loading");

    try {
      await onDelete(targetUserId);
      setTargetUserId(null);
      setAlartSingleStatus("idle");
    } catch {
      setAlartSingleStatus("idle");
    }
  };

  let message: string | null = null;
  message = "冷蔵庫を削除しますか？";

  const action = (
    <p className="m-modal__txt">
      <button
        onClick={handleConfirmDelete}
        disabled={alartSingleStatus === "loading"}
      >
        削除する
      </button>
    </p>
  );

  return (
    <div className="m-share__share-users">
      <p className="m-share__share-users-ttl">共有中のユーザー：</p>
      <ul className="m-share__share-users-list">
        {shareUsers.map((user) => (
          <ShareUserItem
            key={user.id}
            user={user}
            setAlartSingleStatus={setAlartSingleStatus}
            setTargetUserId={setTargetUserId}
          />
        ))}
      </ul>
      {(alartSingleStatus === "confirm" || alartSingleStatus === "loading") && (
        <Message
          message={message}
          actions={action}
          onClose={() => setAlartSingleStatus("idle")}
        />
      )}
    </div>
  );
}

export default ShareUserList;
