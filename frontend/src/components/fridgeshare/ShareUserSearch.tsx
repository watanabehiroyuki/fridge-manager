interface ShareFormProps {
  onSubmitProps: (email: string) => Promise<void>;
}

function ShareUserSearch({ onSubmitProps }: ShareFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.userSearchEmail.value;
    onSubmitProps(email);
  };

  return (
    <div className="m-share-search">
      <p className="m-share-search__ttl">
        ユーザーを検索
        <span>この冷蔵庫共有したい人のメールアドレスを入力してください</span>
      </p>
      <form
        className="m-share-search-form"
        id="usersSearchForm"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="userSearchEmail"
          className="m-share-search__input"
          placeholder="〇〇@examle.com"
          required
        />
        <button type="submit" className="m-share-search-form__submit-btn">
          検索
        </button>
      </form>
    </div>
  );
}

export default ShareUserSearch;
