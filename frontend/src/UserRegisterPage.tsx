import { Link } from "react-router-dom";
import useUserRegister from "./hooks/useUserRegister";
import Message from "./components/Message";
import UserRegisterForm from "./components/UserRegisterForm";

function UserRegisterPage() {
  const { status, register, reset } = useUserRegister();

  let message: string | null = null;
  if (status === "success") {
    message = "ユーザー登録が完了しました";
  } else if (status === "conflict") {
    message = "既に登録しているユーザーです";
  } else if (status === "error") {
    message = "ユーザーの登録に失敗しました";
  }

  const icon =
    status === "success" ? (
      <div className="m-card__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <path
            d="M113.626,263a100,100,0,1,0,100,100,100,100,0,0,0-100-100Zm52.351,46.256a14.621,14.621,0,0,1,11.965,23.865L113,414.961a14.621,14.621,0,0,1-23.328-.562L45,352.159a14.621,14.621,0,1,1,23.753-17.043l33.377,46.5,52.908-66.669a14.621,14.621,0,0,1,10.94-5.69Z"
            transform="translate(-13.626 -263.001)"
            fill="#0b9b8a"
          />
        </svg>
      </div>
    ) : null;

  const action =
    status === "success" ? (
      <p className="m-modal__txt">
        <Link to="/">ログイン画面</Link>に進んでください
      </p>
    ) : status === "error" ? (
      <p className="m-modal__txt">
        <Link to="/register" onClick={reset}>
          ユーザー新規登録画面
        </Link>
        へ戻ってください
      </p>
    ) : status === "conflict" ? (
      <p className="m-modal__txt">
        <Link to="/register" onClick={reset}>
          ユーザー新規登録画面
        </Link>
        へ戻ってください
      </p>
    ) : null;

  return (
    <>
      {message ? (
        <Message message={message} actions={action} icon={icon} />
      ) : (
        <div className="m-register">
          <div className="m-card">
            <h1 className="m-card__ttl">新規ユーザー登録</h1>
            <p className="m-card__txt">アカウントを作成してください</p>

            <UserRegisterForm onSubmitProps={register} />

            <p className="m-card__txt">
              すでにアカウントをお持ちの方は
              <Link to="/">ログイン</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRegisterPage;
