/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useMemberStore from '../hooks/useMemberStore';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import FormButton from './ui/FormButton';
import Input from './ui/Input';

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h2`
  padding-block: 4px;
  border-bottom: 1px solid ${((props) => props.theme.colors.primary)};
  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
  text-align: center;
`;

const Inputs = styled.div`
  min-width: 390px;
  margin-block: 60px;
  color: ${((props) => props.theme.text.gray)};
`;

const InputWrapper = styled.div`
  & + & {
    margin-top: 24px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 15px;
  color: ${((props) => props.theme.text.red)};
`;

const DefaultMessage = styled.p`
  margin-top: 8px;
  font-size: 15px;
`;

const SignupCompleted = styled(Container)`
  h2 {
    margin-bottom: 16px;
    font-size: ${((props) => props.theme.size.h1)};
    font-weight: 700;
    text-align: center;
  }
  p {
    margin-bottom: 40px;
    font-size: ${((props) => props.theme.size.h5)};
    text-align: center;
  }
`;

export default function SignUpForm() {
  const navigate = useNavigate();

  const memberStore = useMemberStore();
  const signUpFormStore = useSignUpFormStore();

  const {
    name, memberName, password, confirmPassword,
  } = signUpFormStore;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpFormStore.hasError()) {
      return;
    }

    await memberStore.signUp({ name, memberName, password });

    signUpFormStore.clear();

    navigate('/signup-success');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>SIGN UP</Title>
        <Inputs>
          <InputWrapper>
            <Label htmlFor="input-name">이름:</Label>
            <Input
              id="input-name"
              type="text"
              name="name"
              value={name}
              error={signUpFormStore.nameFieldError}
              onChange={(e) => signUpFormStore.changeName(e.target.value)}
            />
            {!signUpFormStore.nameFieldError
              ? <DefaultMessage>3~7자까지 한글만 사용가능</DefaultMessage>
              : null }
            {signUpFormStore.nameFieldError
              ? (<ErrorMessage>{signUpFormStore.nameFieldError}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-member-name">아이디:</Label>
            <Input
              id="input-member-name"
              type="text"
              name="memberName"
              value={memberName}
              error={signUpFormStore.memberNameFieldError}
              onChange={(e) => signUpFormStore.changeMemberName(e.target.value)}
            />
            {!signUpFormStore.memberNameFieldError
              ? <DefaultMessage>영문소문자/숫자,4~16자만 사용가능</DefaultMessage>
              : null }
            {signUpFormStore.memberNameFieldError
              ? (<ErrorMessage>{signUpFormStore.memberNameFieldError}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-password">비밀번호:</Label>
            <Input
              id="input-password"
              type="password"
              name="password"
              autoComplete="password"
              value={password}
              error={signUpFormStore.passwordFieldError}
              onChange={(e) => signUpFormStore.changePassword(e.target.value)}
            />
            {!signUpFormStore.passwordFieldError
              ? (<DefaultMessage>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</DefaultMessage>)
              : null }
            {signUpFormStore.passwordFieldError
              ? (<ErrorMessage>{signUpFormStore.passwordFieldError}</ErrorMessage>)
              : null }
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-confirm-password">비밀번호 확인:</Label>
            <Input
              id="input-confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              value={confirmPassword}
              error={signUpFormStore.confirmPasswordFieldError}
              onChange={(e) => (
                signUpFormStore.changeConfirmPassword(e.target.value)
              )}
            />
            {signUpFormStore.confirmPasswordFieldError
              ? (<ErrorMessage>{signUpFormStore.confirmPasswordFieldError}</ErrorMessage>)
              : null }
          </InputWrapper>
        </Inputs>
        <FormButton type="submit">회원가입</FormButton>
      </form>
    </Container>
  );
}
