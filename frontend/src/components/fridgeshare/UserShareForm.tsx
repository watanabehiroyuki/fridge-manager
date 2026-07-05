import { useState } from "react";

interface Props {
  searchUser: string;
  onAddUser: (userEmail: string) => Promise<void>;
}

function UserShareForm({ searchUser, onAddUser }: Props) {
  const [addStatus, setAddStatus] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddStatus(false);

    try {
      await onAddUser(searchUser);
      setAddStatus(true);
    } catch {
      setAddStatus(false);
    }
  };

  return (
    <div className="m-share-search__result">
      <p className="m-share-search__shareuser">
        <span className="">{searchUser}</span>
      </p>
      <button
        type="button"
        className="m-share-search__add-btn"
        onClick={handleClick}
      >
        共有
      </button>
      {addStatus && (
        <p className="m-share-search__complete">共有が完了しました</p>
      )}
    </div>
  );
}

export default UserShareForm;
