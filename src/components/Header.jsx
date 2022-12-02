import { useEffect } from 'react';
import useForceUpdate from '../hooks/useForceUpdate';
import useMemberStore from '../hooks/useMemberStore';

import TopBar from './TopBar';

export default function Header() {
  const forceUpdate = useForceUpdate();
  const memberStore = useMemberStore();

  useEffect(() => {
    memberStore.subscribe(forceUpdate);

    return () => memberStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  // 매번 accesstoken으로 로그인하게 해야함
  return (
    <TopBar />
  );
}
