import { Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import Info from './screens/Info';
import Login from './screens/Login';
import Repositories from './screens/Repositories';
import Repository from './screens/Repository';

import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <Button variant="outlined">Test MUI button</Button>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="info" element={<Info />} />
          <Route path="repositories" element={<Repositories />} />
          <Route path=":repositoryId" element={<Repository />} />
          <Route path=":repositoryId/details" element={<h1>Details</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
