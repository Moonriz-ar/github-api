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
      main: '#A1C298',
      light: '#bcceb6',
      dark: '#7ca072',
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
          <Route path="repositories" element={<Repositories />} />
          <Route path="repositories/:repoName" element={<Repository />} />
        </Route>
        <Route path="*" element={<h1>404 Nothing here!</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
