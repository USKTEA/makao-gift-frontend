import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1em;
  padding-block: 0.5em;
  border-bottom: 1px solid  ${(props) => props.theme.colors.primary};
  text-align: center;
  color: ${(props) => props.theme.colors.primaryText};
`;

export default Title;
