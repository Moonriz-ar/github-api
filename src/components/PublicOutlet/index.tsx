import { Navigate, Outlet } from 'react-router-dom';

import { store, useSnapshot } from '../../store/store';

interface Props {
  children: React.ReactNode;
}

const PublicOutlet = ({ children }: Props) => {
  const snap = useSnapshot(store);

  return !snap.user?.id ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicOutlet;
