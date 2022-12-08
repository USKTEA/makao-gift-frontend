/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';

import useMemberStore from '../hooks/useMemberStore';
import useSignUpFormStore from '../hooks/useSignUpFormStore';

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
    <>
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input-name">이름:</label>
          <input
            id="input-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => signUpFormStore.changeName(e.target.value)}
          />
          {!signUpFormStore.nameFieldError
            ? <p>3~7자까지 한글만 사용가능</p>
            : null }
          {signUpFormStore.nameFieldError
            ? (<p>{signUpFormStore.nameFieldError}</p>)
            : null }
        </div>
        <div>
          <label htmlFor="input-member-name">아이디:</label>
          <input
            id="input-member-name"
            type="text"
            name="memberName"
            value={memberName}
            onChange={(e) => signUpFormStore.changeMemberName(e.target.value)}
          />
          {!signUpFormStore.memberNameFieldError
            ? <p>영문소문자/숫자,4~16자만 사용가능</p>
            : null }
          {signUpFormStore.memberNameFieldError
            ? (<p>{signUpFormStore.memberNameFieldError}</p>)
            : null }
        </div>
        <div>
          <label htmlFor="input-password">비밀번호:</label>
          <input
            id="input-password"
            type="text"
            name="password"
            value={password}
            onChange={(e) => signUpFormStore.changePassword(e.target.value)}
          />
          {!signUpFormStore.passwordFieldError
            ? (<p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>)
            : null }
          {signUpFormStore.passwordFieldError
            ? (<p>{signUpFormStore.passwordFieldError}</p>)
            : null }
        </div>
        <div>
          <label htmlFor="input-confirm-password">비밀번호 확인:</label>
          <input
            id="input-confirm-password"
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => (
              signUpFormStore.changeConfirmPassword(e.target.value)
            )}
          />
          {signUpFormStore.confirmPasswordFieldError
            ? (<p>{signUpFormStore.confirmPasswordFieldError}</p>)
            : null }
        </div>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
