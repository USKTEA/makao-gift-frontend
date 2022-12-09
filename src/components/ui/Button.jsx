import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  font-weight: 700;
  width: 100%;
  height: 3.75em;
  border: none;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;

  :hover {
    color: #006148
  }

  :active {
    background: #006148;
    color: white;
  }

  :disabled {
    background: #8D8D8D;
    color: white;
    cursor: default;
  }
`;

export default Button;
