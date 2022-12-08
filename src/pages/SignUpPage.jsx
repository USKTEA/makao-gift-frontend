/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useMemberStore from '../hooks/useMemberStore';

import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const memberStore = useMemberStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (memberStore.isLoggedIn()) {
      navigate('/');
    }
  }, []);

  return (<SignUpForm />);
}
