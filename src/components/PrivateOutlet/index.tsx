import { store, useSnapshot } from '../../store/store';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '../MainLayout';

const PrivateOutlet = () => {
  const snap = useSnapshot(store);

  return snap.user?.id ? ( // check if logged in
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
