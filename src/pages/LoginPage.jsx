export default function LoginPage() {
  return (
    <>
      <h2>USER LOGIN</h2>
      <form>
        <div>
          <input type="text" placeholder="아이디" />
        </div>
        <div>
          <input type="text" placeholder="비밀번호" />
        </div>
        <button type="submit">로그인하기</button>
      </form>
      <div>
        <a href="/signup">회원가입</a>
      </div>
    </>
  );
}
