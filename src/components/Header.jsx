import styled from 'styled-components';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useMemberStore from '../hooks/useMemberStore';

import numberFormat from '../utils/numberFormat';

const Container = styled.header`
  font-weight: 700;
  width: 100%;
  height: 4em;
  border-bottom: 1px solid #D9D9D9;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  min-width: 1024px;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled(Link)`
  font-size: 1.5em;
`;

const Navigation = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 1em;
  margin-right: 1em;
  ul:first-child {
    flex: 1;
  };

  div {
    display: flex;
    align-items: center;
    gap: 3em;
  }

  button {
    font-size: 1em;
    font-weight: 700;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 3em;
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => (props.selected ? '3px solid #22DAAB' : 'none')}};
`;

export default function Header() {
  const memberStore = useMemberStore();

  const navigate = useNavigate();

  const location = useLocation();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    memberStore.clear();

    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Navigation>
          <List>
            <li>
              <Title to="/products">
                선물하기
                {' '}
              </Title>
            </li>
            <li>
              <StyledLink to="/" selected={location.pathname === '/'}>
                홈
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/products"
                selected={location.pathname.startsWith('/products') || location.pathname === '/order'}
              >
                스토어
              </StyledLink>
            </li>
            <li>
              {accessToken
                ? (
                  <StyledLink
                    to="/orders"
                    selected={location.pathname.startsWith('/orders')}
                  >
                    주문조회
                  </StyledLink>
                )
                : <Link to="/login">주문조회</Link>}
            </li>
          </List>
          {accessToken
            ? (
              <div>
                <div>
                  <p>{`내 잔액: ${numberFormat(memberStore.amount())}원`}</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )
            : (
              <List>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </List>
            ) }
        </Navigation>
      </Wrapper>
    </Container>
  );
}
