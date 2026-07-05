import useRemoveUser from "@/hooks/fridgeshare/useRemoveUser";

interface UserProps {
  name: string;
  id: number;
  role: string;
  fridgeId: number;
}

function FridgeUser({ name, id, role, fridgeId }: UserProps) {
  const { removeStatus, remove } = useRemoveUser();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    remove(id, fridgeId);
  };

  return (
    <>
      {removeStatus !== "success" && (
        <div className="m-fridge-users">
          <div className="m-fridge-users__name">
            {name}
            {role === "MEMBER" && (
              <button
                type="button"
                value={id}
                data-user="remove"
                className="m-fridge-users__remove-btn"
                onClick={handleClick}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default FridgeUser;
