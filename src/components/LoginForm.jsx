/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useMemberStore from '../hooks/useMemberStore';

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
    <>
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="아이디"
            {...register('memberName', {
              required: true,
            })}
          />

        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호"
            {...register('password', {
              required: true,
            })}
          />

        </div>
        <button type="submit">로그인하기</button>
      </form>
      {errors.memberName?.type === 'required'
        && <p>아이디를 입력해주세요</p>}
      {errors.password?.type === 'required' && !errors.memberName
        && <p>비밀번호를 입력해주세요</p>}
      {memberStore.error && <p>{memberStore.error}</p>}
      <div>
        <a href="/signup">회원가입</a>
      </div>
    </>
  );
}
