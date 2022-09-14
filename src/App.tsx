import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './screens/Home';
import Info from './screens/Info';
import Login from './screens/Login';
import Repositories from './screens/Repositories';
import Repository from './screens/Repository';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#40c4ff',
      light: '#66cfff',
      dark: '#2c89b2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ec407a',
      light: '#ef6694',
      dark: '#a52c55',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="info" element={<Info />} />
          <Route path="repositories" element={<Repositories />} />
          <Route path=":repositoryId" element={<Repository />} />
          <Route path=":repositoryId/details" element={<h1>Details</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
