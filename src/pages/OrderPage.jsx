/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import styled from 'styled-components';

import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';
import useOrderStore from '../hooks/useOrderStore';
import useMemberStore from '../hooks/useMemberStore';

import OrderForm from '../components/OrderForm';
import ProductArea from '../components/ProductArea';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid ${((props) => props.theme.colors.border)};
`;

const Wrapper = styled.div`
  padding: 80px 100px;
`;

export default function OrderPage() {
  const orderSpecificationStore = useOrderSpecificationStore();
  const memberStore = useMemberStore();
  const orderStore = useOrderStore();

  const { addDeliveryInformation, getSpecification } = orderSpecificationStore;
  const { createOrder } = orderStore;
  const { payFor } = memberStore;

  const [specification] = useLocalStorage('specification', '');

  useEffect(() => {
    if (specification) {
      orderSpecificationStore.loadSpecification(specification);
    }
  }, [specification]);

  const { orderSpecification } = orderSpecificationStore;

  if (!orderSpecification) {
    return (<p>...now loading</p>);
  }

  const { product } = orderSpecification;

  const handleAddDeliveryInformation = ({ recipient, address, message }) => {
    addDeliveryInformation.call(
      orderSpecificationStore,
      { recipient, address, message },
    );
  };

  const handleGetSpecification = (() => getSpecification.call(
    orderSpecificationStore,
  ));

  const handlePayment = () => {
    payFor.call(memberStore, { cost: orderSpecificationStore.cost() });
  };

  return (
    <Container>
      <Wrapper>
        <ProductArea
          imageUrl={product.imageUrl}
          manufacturer={product.manufacturer}
          name={product.name}
          quantity={orderSpecification.quantity}
          cost={orderSpecification.cost}
        />
        <OrderForm
          addDeliveryInformation={handleAddDeliveryInformation}
          getSpecification={handleGetSpecification}
          createOrder={createOrder}
          handlePayment={handlePayment}
        />
      </Wrapper>
    </Container>
  );
}
