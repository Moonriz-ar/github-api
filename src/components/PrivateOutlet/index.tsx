import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from '../../context/userContext';
import MainLayout from '../MainLayout';

const PrivateOutlet = () => {
  const userContext = useContext(UserContext); // auth context

  return userContext.user?.id ? ( // check if logged in
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateOutlet;
