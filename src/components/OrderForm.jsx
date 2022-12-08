/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export default function OrderForm(
  {
    addDeliveryInformation, getSpecification, createOrder, handlePayment,
  },
) {
  const [, setSpecification] = useLocalStorage('specification', '');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ recipient, address, message }) => {
    addDeliveryInformation({ recipient, address, message });

    handlePayment();

    await createOrder({ specification: getSpecification() });

    setSpecification('');
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="recipient">받는 분 성함</label>
        <input
          id="recipient"
          type="text"
          maxLength="7"
          {...register('recipient', {
            required: true,
            pattern: {
              value: /^[가-힣]{3,}$/g,
              message: '이름을 다시 확인해주세요',
            },
          })}
        />
        {!errors.recipient && <p>3~7자까지 한글만 사용가능</p>}
        {errors.recipient?.type === 'required'
          && <p>성함을 입력해주세요</p> }
        {errors.recipient?.type === 'pattern'
          && <p>{errors.recipient.message}</p> }
      </div>
      <div>
        <label htmlFor="address">받는 분 주소</label>
        <input
          id="address"
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
