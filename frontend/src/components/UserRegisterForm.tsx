interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmitProps: (params: RegisterParams) => Promise<void>;
}

function UserRegisterForm({ onSubmitProps }: RegisterFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;
    onSubmitProps({ username, email, password, confirmPassword });
  };

  return (
    <form className="m-form" onSubmit={handleSubmit}>
      <div className="m-form__group">
        <label htmlFor="username">ユーザー名</label>
        <div className="m-form__input">
          <input
            type="text"
            name="username"
            placeholder="ユーザー名を入力してください"
            required
            id="username"
          ></input>
        </div>
      </div>
      <div className="m-form__group">
        <label htmlFor="email">メールアドレス</label>
        <div className="m-form__input">
          <input
            type="email"
            name="email"
            placeholder="メールアドレスを入力してください"
            required
            id="email"
          ></input>
        </div>
      </div>
      <div className="m-form__group">
        <label htmlFor="password">パスワード</label>
        <div className="m-form__input">
          <input
            type="text"
            name="password"
            placeholder="パスワードを入力してください"
            required
            id="password"
            className="js-valid-password"
          ></input>
        </div>
      </div>
      <div className="m-form__group">
        <label htmlFor="confirmPassword">（確認用）パスワード</label>
        <div className="m-form__input">
          <input
            type="text"
            name="confirmPassword"
            required
            id="confirmPassword"
            className="js-valid-password-confirm"
          ></input>
        </div>
      </div>
      <button type="submit" className="m-form__submit-btn">
        新規登録する
      </button>
    </form>
  );
}

export default UserRegisterForm;
