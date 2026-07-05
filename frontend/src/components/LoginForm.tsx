interface LoginParams {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmitLogin: (params: LoginParams) => Promise<void>;
}

function LoginForm({ onSubmitLogin }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    onSubmitLogin({ email, password });
  };

  return (
    <form className="m-form" onSubmit={handleSubmit}>
      <div className="m-form__group">
        <label htmlFor="email">メールアドレス</label>
        <div className="m-form__input">
          <input
            type="email"
            name="email"
            placeholder="メールアドレスを入力してください"
            required
            id="email"
          />
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
            className=""
          />
        </div>
      </div>
      <button type="submit" className="m-form__submit-btn">
        ログイン
      </button>
    </form>
  );
}

export default LoginForm;
