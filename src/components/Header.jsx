import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/products">스토어</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/orders">주문조회</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
