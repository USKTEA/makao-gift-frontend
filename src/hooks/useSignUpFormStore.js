import useStore from './useStore';
import { signUpFormStore } from '../stores/SignUpFormStore';

export default function useSignUpFormStore() {
  return useStore(signUpFormStore);
}
