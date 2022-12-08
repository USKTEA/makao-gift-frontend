/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';
import useOrderStore from '../hooks/useOrderStore';
import useMemberStore from '../hooks/useMemberStore';

import OrderForm from '../components/OrderForm';
import ProductArea from '../components/ProductArea';

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
    <>
      <ProductArea
        imageUrl={orderSpecificationStore.imageUrl()}
        manufacturer={orderSpecificationStore.manufacturer()}
        name={orderSpecificationStore.name()}
        quantity={orderSpecificationStore.quantity()}
        cost={orderSpecificationStore.cost()}
      />
      <OrderForm
        addDeliveryInformation={handleAddDeliveryInformation}
        getSpecification={handleGetSpecification}
        createOrder={createOrder}
        handlePayment={handlePayment}
      />
    </>
  );
}
