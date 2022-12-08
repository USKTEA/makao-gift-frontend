import useStore from './useStore';
import { memberStore } from '../stores/MemberStore';

export default function useMemberStore() {
  return useStore(memberStore);
}
