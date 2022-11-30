import styled from 'styled-components';

const Container = styled.div`
  height: 8em;
  display: flex;
  flex-direction: column;
 justify-content: center;
`;

export default function Banner() {
  return (
    <Container>
      <p>평범한 선물은 주기도 민망하다구요?</p>
      <h2>
        작정하고 준비한
        <br />
        마카오톡 선물하기 아이템
      </h2>
      <p>마카오 선물하기에서만 볼 수 있는 특별템 기획전</p>
    </Container>
  );
}
