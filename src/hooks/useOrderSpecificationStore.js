import useStore from './useStore';
import { orderSpecificationStore } from '../stores/OrderSpecificationStore';

export default function useOrderSpecificationStore() {
  return useStore(orderSpecificationStore);
}
