import { Outlet } from 'react-router-dom';

const Home = (): JSX.Element => {
  return (
    <>
      <h1>Home</h1>
      <Outlet />
    </>
  );
};

export default Home;
