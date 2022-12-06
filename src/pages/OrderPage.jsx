/* eslint-disable jsx-a11y/label-has-associated-control */

import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';

import OrderForm from '../components/OrderForm';
import ProductArea from '../components/ProductArea';
import useOrderStore from '../hooks/useOrderStore';
import useMemberStore from '../hooks/useMemberStore';

export default function OrderPage() {
  const orderSpecificationStore = useOrderSpecificationStore();
  const memberStore = useMemberStore();
  const orderStore = useOrderStore();

  const { addDeliveryInformation, getSpecification } = orderSpecificationStore;
  const { requestOrder } = orderStore;
  const { payFor } = memberStore;

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
        requestOrder={requestOrder}
        handlePayment={handlePayment}
      />
    </>
  );
}
