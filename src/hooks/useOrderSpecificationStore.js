import { orderSpecificationStore } from '../stores/OrderSpecificationStore';

import useStore from './useStore';

export default function useOrderSpecificationStore() {
  return useStore(orderSpecificationStore);
}
