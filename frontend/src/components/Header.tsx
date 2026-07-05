import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import Logout from "@/components/Logout";

function Header() {
  const { logout } = useLogout();

  return (
    <header className="g-header">
      <Link to={`/fridges`} className="g-header__ttl">
        <span className="icn"></span>冷蔵庫管理
      </Link>
      <div>
        {/* <p>名前が入る</p> */}
        <div className="g-header__logout-btn">
          <Logout onLogout={logout} />
        </div>
      </div>
    </header>
  );
}

export default Header;
