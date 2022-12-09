import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 25em;
`;

const StyledLink = styled(Link)`
  font-size: 1em;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25em;
  height: 3.75em;
  margin-top: 2em;
  border: none;
  border-radius: 0.5em;
  background: #22ddaa;
  color: white;
  cursor: pointer;

  :hover {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: ${(props) => props.theme.colors.primary};
    color: #006148;
    cursor: pointer;
  }

  :active {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #006148;
    color: white;
    cursor: pointer;
  }

  :disabled {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #8D8D8D;
    color: white;
  }
`;

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const Message = styled.p`
  font-size: 1.25em;
  color: #444444;
`;

export default function SignUpSuccessPage() {
  return (
    <Container>
      <Header>회원가입 완료</Header>
      <Message>마카오 선물하기 회원가입이 완료되었습니다.</Message>
      <Message>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</Message>
      <StyledLink to="/login">로그인하기</StyledLink>
    </Container>
  );
}
