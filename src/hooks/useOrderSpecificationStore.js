import { useEffect } from 'react';

import { orderSpecificationStore } from '../stores/OrderSpecificationStore';

import useForceUpdate from './useForceUpdate';

export default function useOrderStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderSpecificationStore.subscribe(forceUpdate);

    return () => orderSpecificationStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return orderSpecificationStore;
}
