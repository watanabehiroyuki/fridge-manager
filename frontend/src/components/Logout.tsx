interface Props {
  onLogout: () => Promise<void>;
}

function Logout({ onLogout }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <button type="button" className="g-logout-btn" onClick={handleClick}>
      ログアウト
    </button>
  );
}

export default Logout;
