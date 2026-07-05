import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  const { login, status, setStatus } = useLogin();
  const message = status === "error" ? "ログインに失敗しました" : null;

  return (
    <>
      <div className="m-login">
        <div className="m-card">
          <h1 className="m-card__ttl">冷蔵庫管理</h1>
          <p className="m-card__txt">ログインしてください</p>
          <LoginForm onSubmitLogin={login} />
          {message && (
            <Message message={message} onClose={() => setStatus("idle")} />
          )}
          <p className="m-card__txt">
            アカウントをお持ちでない方は
            <Link to={`/register`}>新規登録</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
