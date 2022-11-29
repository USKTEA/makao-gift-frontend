/* eslint-disable jsx-a11y/label-has-associated-control */

export default function SignUpPage() {
  return (
    <>
      <h2>SIGN UP</h2>
      <form action="">
        <div>
          <label htmlFor="input-name">이름:</label>
          <input id="input-name" type="text" />
        </div>
        <div>
          <label htmlFor="input-user-name">아이디:</label>
          <input id="input-user-name" type="text" />
        </div>
        <div>
          <label htmlFor="input-password">비밀번호:</label>
          <input id="input-password" type="text" />
        </div>
        <div>
          <label htmlFor="input-confirm-password">비밀번호 확인:</label>
          <input id="input-confirm-password" type="text" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
