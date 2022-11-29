import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  nav {
    ul {
      display: flex;
      list-style: none;
    }

    li {
      margin-right: .5em;
    }
  }
`;

export default function Header() {
  return (
    <Container>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">홈</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/products">스토어</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/orders">주문조회</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </div>
        </ul>
      </nav>
    </Container>
  );
}
