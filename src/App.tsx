import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './screens/Home';
import Info from './screens/Info';
import Login from './screens/Login';
import MainLayout from './components/MainLayout';
import Repositories from './screens/Repositories';
import Repository from './screens/Repository';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff835d',
      light: '#fa9e83',
      dark: '#fb7358',
      contrastText: '#fff',
    },
    secondary: {
      main: '#80deea',
      light: '#99e4ee',
      dark: '#599ba3',
      contrastText: '#000',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="repositories" element={<Repositories />}>
            <Route path=":repositoryId" element={<Repository />} />
            <Route path=":repositoryId/details" element={<h1>Details</h1>} />
            <Route path="*" element={<h1>404 Nothing here!</h1>} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 Nothing here!</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
