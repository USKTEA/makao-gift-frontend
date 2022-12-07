/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useMemberStore from '../hooks/useMemberStore';

export default function LoginForm() {
  const navigate = useNavigate();

  const memberStore = useMemberStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { memberName, password } = data;

    const accessToken = await memberStore.login({ memberName, password });

    if (accessToken) {
      setAccessToken(accessToken);

      navigate(-1);
    }
  };

  return (
    <>
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="아이디" {...register('memberName')} />
        </div>
        <div>
          <input type="text" placeholder="비밀번호" {...register('password')} />
        </div>
        <button type="submit">로그인하기</button>
      </form>
      <div>
        <a href="/signup">회원가입</a>
      </div>
    </>
  );
}
