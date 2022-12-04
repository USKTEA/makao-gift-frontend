/* eslint-disable jsx-a11y/label-has-associated-control */

import OrderForm from '../components/OrderForm';
import ProductArea from '../components/ProductArea';
import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';

export default function OrderPage() {
  const orderSpecificationStore = useOrderSpecificationStore();

  return (
    <>
      <ProductArea
        imageUrl={orderSpecificationStore.imageUrl()}
        manufacturer={orderSpecificationStore.manufacturer()}
        name={orderSpecificationStore.name()}
        quantity={orderSpecificationStore.quantity()}
        cost={orderSpecificationStore.cost()}
      />
      <OrderForm />
    </>
  );
}
