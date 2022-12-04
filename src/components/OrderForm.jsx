/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

export default function OrderForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="recipient-name">받는 분 성함</label>
        <input
          id="recipient-name"
          type="text"
          maxLength="7"
          {...register('name', {
            required: true,
            pattern: {
              value: /^[가-힣]{3,}$/g,
              message: '이름을 다시 확인해주세요',
            },
          })}
        />
        {!errors.name && <p>3~7자까지 한글만 사용가능</p>}
        {errors.name?.type === 'required'
          && <p>성함을 입력해주세요</p> }
        {errors.name?.type === 'pattern'
          && <p>{errors.name.message}</p> }
      </div>
      <div>
        <label htmlFor="recipient-address">받는 분 주소</label>
        <input
          id="recipient-address"
          type="text"
          {...register('address', {
            required: true,
          })}
        />
        {errors.address?.type === 'required'
          ? <p>주소를 입력해주세요</p>
          : null }
      </div>
      <div>
        <label htmlFor="message">받는 분께 보내는 메세지</label>
        <textarea
          id="message"
          type="text"
          maxLength="100"
          {...register('message')}
        />
        <p>100글자 이내로 입력해주세요</p>
      </div>
      <button type="submit">선물하기</button>
    </form>
  );
}
