import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useCurrentFridge from "@/hooks/fridgeshare/useCurrentFridge";
import useSearchUser from "@/hooks/fridgeshare/useSearchUser";
import useShareUser from "@/hooks/fridgeshare/useShareUser";
import useCurrentShareUsers from "@/hooks/fridgeshare/useCurrentShareUsers";
import useRemoveUser from "@/hooks/fridgeshare/useRemoveUser";
import ShareUserSearch from "@/components/fridgeshare/ShareUserSearch";
import UserShareForm from "@/components/fridgeshare/UserShareForm";
import ShareUserList from "@/components/fridgeshare/ShareUserList";

function UserSharePage() {
  const { fridgeName, fridgeNameGet } = useCurrentFridge();
  const { shareUsers, setShareUsers, shareUsersGet } = useCurrentShareUsers();
  const { searchUsers, emailGet, errorMessage } = useSearchUser();
  const { emailPost } = useShareUser();
  const { remove } = useRemoveUser();
  const { fridgeId } = useParams<{ fridgeId: string }>();

  useEffect(() => {
    if (!fridgeId) return;
    fridgeNameGet(Number(fridgeId));
    shareUsersGet(Number(fridgeId));
  }, [fridgeId]);

  const handleDelete = async (userId: number) => {
    if (!fridgeId) return;
    const fridgeIdNum = Number(fridgeId);
    const prevUsers = shareUsers;
    setShareUsers((prev) => prev.filter((user) => user.id !== userId));
    try {
      await remove(userId, fridgeIdNum);
    } catch {
      setShareUsers(prevUsers);
    }
  };

  const handleAddUser = async (userEmail: string) => {
    if (!fridgeId) return;

    const fridgeIdNum = Number(fridgeId);
    const users = await emailPost(fridgeIdNum, userEmail);
    setShareUsers(users);
  };

  return (
    <>
      <div className="m-share">
        <div className="m-share__head">
          <Link to="/fridges" className="m-share__back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="69.296"
              viewBox="0 0 200 69.296"
            >
              <path
                d="M127.794,268.963a7.693,7.693,0,0,0-4.3,13.878L176.1,322.866H14.31a7.694,7.694,0,1,0,0,15.388H198.919a7.693,7.693,0,0,0,4.662-13.815l-70.767-53.846A7.693,7.693,0,0,0,127.794,268.963Z"
                transform="translate(-6.616 -268.958)"
              />
            </svg>
          </Link>
          <h1 className="m-share__ttl">
            冷蔵庫を共有
            <br />
            <span>{fridgeName}</span>
          </h1>
        </div>
        <div className="m-share__main">
          <ShareUserSearch onSubmitProps={emailGet} />
          {searchUsers.map((user) => (
            <UserShareForm
              key={user}
              searchUser={user}
              onAddUser={handleAddUser}
            />
          ))}
          {errorMessage && (
            <p className="m-share__search-error">{errorMessage}</p>
          )}
          <ShareUserList shareUsers={shareUsers} onDelete={handleDelete} />
          <div className="m-share__notice">
            <p className="m-share__notice-ttl">共有について</p>
            <ul className="m-share__notice-list">
              <li>• 共有されたユーザーは食材の追加・編集・削除ができます</li>
              <li>• オーナーのみが他のユーザーを招待できます</li>
              <li>• 招待されたユーザーは自分の冷蔵庫一覧に表示されます</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSharePage;
