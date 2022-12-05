/* eslint-disable jsx-a11y/label-has-associated-control */

import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';

import OrderForm from '../components/OrderForm';
import ProductArea from '../components/ProductArea';
import useOrderStore from '../hooks/useOrderStore';

export default function OrderPage() {
  const orderSpecificationStore = useOrderSpecificationStore();

  const orderStore = useOrderStore();

  const { addDeliveryInformation, getSpecification } = orderSpecificationStore;
  const { requestOrder } = orderStore;

  const handleAddDeliveryInformation = ({ recipient, address, message }) => {
    const boundAddDeliveryInformation = addDeliveryInformation.bind(
      orderSpecificationStore,
    );

    boundAddDeliveryInformation({ recipient, address, message });
  };

  const handleGetSpecification = () => {
    const boundGetSpecification = getSpecification.bind(
      orderSpecificationStore,
    );

    return boundGetSpecification();
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
      />
    </>
  );
}
