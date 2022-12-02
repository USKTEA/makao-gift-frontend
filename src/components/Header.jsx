import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useMemberStore from '../hooks/useMemberStore';

import numberFormat from '../utils/numberFormat';

const Container = styled.header`
display: flex;

nav {
  display: flex;

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
  const memberStore = useMemberStore();

  const { amount } = memberStore;

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <nav>
        <h2>선물하기</h2>
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
        </ul>
      </nav>
      {accessToken
        ? (
          <nav>
            <ul>
              <div>
                <li>
                  <p>{`내 잔액: ${numberFormat(amount)}원`}</p>
                </li>
              </div>
              <div>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                  >
                    로그아웃
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        )
        : (
          <nav>
            <ul>
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
        ) }
    </Container>
  );
}
