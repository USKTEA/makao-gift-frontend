/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
import FormButton from './ui/FormButton';
import Input from './ui/Input';

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800%;
`;

const Wrapper = styled.div`
  width: 1140px;
  padding: 4px 100px 20px;
`;

const Form = styled.form`
  color: ${((props) => props.theme.text.gray)};
  font-size: 15px;
  span {
    color: ${((props) => props.theme.text.red)};
  }
`;

const Inputs = styled.div`
  label {
    display: inline-block;
    margin-bottom: 8px;
  }
  & + & {
    margin-top: 24px;
  }
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

const ButtonWrapper = styled.div`
  width: 60%;
  margin: 40px auto 0;
`;

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
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <label htmlFor="recipient">받는 분 성함</label>
            <Input
              id="recipient"
              type="text"
              maxLength="7"
              name="recipient"
              error={(errors.recipient && errors.address) || errors.recipient}
              {...register('recipient', {
                required: true,
                pattern: {
                  value: /^[가-힣]{3,}$/g,
                  message: '이름을 다시 확인해주세요',
                },
              })}
            />
            {!errors.recipient && (
              <DefaultMessage>
                3~7자까지 한글만 사용가능
              </DefaultMessage>
            )}
            {errors.recipient?.type === 'required'
          && <ErrorMessage>성함을 입력해주세요</ErrorMessage> }
            {errors.recipient?.type === 'pattern'
          && <ErrorMessage>{errors.recipient.message}</ErrorMessage> }
          </Inputs>
          <Inputs>
            <label htmlFor="address">받는 분 주소</label>
            <Input
              id="address"
              type="text"
              name="address"
              error={(errors.recipient && errors.address) || errors.address}
              {...register('address', {
                required: true,
              })}
            />
            {errors.address?.type === 'required'
              ? <ErrorMessage>주소를 입력해주세요</ErrorMessage>
              : null }
          </Inputs>
          <Inputs>
            <label htmlFor="message">받는 분께 보내는 메세지</label>
            <Input
              id="message"
              type="text"
              maxLength="100"
              name="message"
              {...register('message')}
            />
            <DefaultMessage>100글자 이내로 입력해주세요</DefaultMessage>
          </Inputs>
          <ButtonWrapper>
            <FormButton type="submit">선물하기</FormButton>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
}
