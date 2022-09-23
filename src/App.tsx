import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { UserContextProvider } from './context/userContext';

import Home from './screens/Home';
import Info from './screens/Info';
import Login from './screens/Login';
import Repositories from './screens/Repositories';
import Repo from './screens/Repositories/components/Repo';
import PrivateOutlet from './components/PrivateOutlet';
import PublicOutlet from './components/PublicOutlet';

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
    <UserContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route
            path="login"
            element={
              <PublicOutlet>
                <Login />
              </PublicOutlet>
            }
          />
          <Route path="/" element={<PrivateOutlet />}>
            <Route index element={<Home />} />
            <Route path="info" element={<Info />} />
            <Route path="repositories" element={<Repositories />} />
            <Route path="repositories/:repoName" element={<Repo />} />
          </Route>

          <Route path="*" element={<h1>404 Nothing here!</h1>} />
        </Routes>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
