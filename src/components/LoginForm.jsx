/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useMemberStore from '../hooks/useMemberStore';
import Title from './ui/Title';
import FormButton from './ui/FormButton';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25em;
  height: 3.75em;
  margin-top: 2.5em;
`;

const Input = styled.input`
  font-size: 1em;
  font-weight: 400;
  height: 3.75em;
  margin-top: 1em;
  padding: 1em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: #666666;

  :focus {
    font-size: 1em;
    border: ${(props) => (`1px solid${props.error ? '#FF4244D' : props.theme.colors.primary}`)};
    outline: none;
    color: #666666;
  }
`;

const Error = styled.p`
  display: flex;
  align-items: center;
  height: 3.75em;
  color: #FF424D;
`;

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const memberStore = useMemberStore();

  const onSubmit = async (data) => {
    const { memberName, password } = data;

    const accessToken = await memberStore.login({ memberName, password });

    if (accessToken) {
      setAccessToken(accessToken);

      navigate(-1);
    }
  };

  return (
    <div>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="아이디"
          error={errors.memberName}
          {...register('memberName', {
            required: true,
          })}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          autoComplete="password"
          error={errors.password}
          {...register('password', {
            required: true,
          })}
        />
        <Error>
          {errors.memberName?.type === 'required'
        && '아이디를 입력해주세요'}
          {errors.password?.type === 'required'
        && !errors.memberName
        && '비밀번호를 입력해주세요'}
          {memberStore.error && `${memberStore.error}`}
        </Error>
        <FormButton type="submit">로그인하기</FormButton>
      </Form>
      <StyledLink to="/signup">
        회원가입
      </StyledLink>
    </div>
  );
}
