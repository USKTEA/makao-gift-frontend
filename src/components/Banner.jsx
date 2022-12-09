import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 4em;
  left: 0;
  width: 100vw;
  height: 18em;;
  background: url(/assets/images/banner.png) center / cover , linear-gradient(90deg, #FCBE2E, #F7FF73);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 5em;

  p:first-child {
    font-weight: 700;
    color: #F3A300;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 700;

  strong {
    display: block;
  }
`;

export default function Banner() {
  return (
    <Container>
      <Wrapper>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <Title>
          작정하고 준비한
          <strong />
          마카오톡 선물하기 아이템
        </Title>
        <p>마카오 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </Wrapper>
    </Container>
  );
}
