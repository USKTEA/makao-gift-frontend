import styled from 'styled-components';

const Container = styled.div`
font-weight: 700;
display: flex;
width: 1024px;
`;

const LeftWrapper = styled.div`
flex: 1;
display: flex;
padding-left: 2em;
flex-direction: column;
justify-content: center;
width: 100%;
background-color: rgba(200, 200, 200, 0.05);
border-radius: 1.5em;
`;

const RightWrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
`;

const Message = styled.p`
font-size: 1.5em;
color: ${(props) => props.theme.colors.secondaryText};
`;

const Title = styled.h1`
font-size: 2.25em;
margin-block: 0.65em;

strong {
  display: block;
}
`;

export default function HomePage() {
  return (
    <Container>
      <LeftWrapper>
        <Message>무엇을 선물할지 고민이라면</Message>
        <Title>
          <strong>
            특별한
          </strong>
          선물을 전하세요
        </Title>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 선물</p>
      </LeftWrapper>
      <RightWrapper>
        <img
          src="/assets/images/home-gift.png"
          alt="선물사진"
          width={300}
          height={300}
        />
      </RightWrapper>
    </Container>
  );
}
