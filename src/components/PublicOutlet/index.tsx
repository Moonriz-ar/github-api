import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../../context/userContext';

interface Props {
  children: React.ReactNode;
}

const PublicOutlet = ({ children }: Props) => {
  const userContext = useContext(UserContext);

  return !userContext.user?.id ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicOutlet;
