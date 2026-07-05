import type { AlartStatus } from "@/types/AlartStatus";

interface ShareUsers {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Props {
  user: ShareUsers;
  setAlartSingleStatus: React.Dispatch<React.SetStateAction<AlartStatus>>;
  setTargetUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

function ShareUserItem({ user, setAlartSingleStatus, setTargetUserId }: Props) {
  const memberFlag = user.role === "MEMBER";

  const handleConfirmDeleteOpen = () => {
    setAlartSingleStatus("confirm");
    setTargetUserId(user.id);
  };

  return (
    <li>
      <p className="username">{user.username}</p>
      <p className="email">{user.email}</p>
      {!memberFlag && <p className="role">オーナー</p>}
      {memberFlag && (
        <>
          <button
            type="button"
            className="remove-btn"
            onClick={handleConfirmDeleteOpen}
          >
            ×
          </button>
        </>
      )}
    </li>
  );
}

export default ShareUserItem;
