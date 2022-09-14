import { Outlet } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledLink } from '../Links/styles';

import { userMock as user } from '../../mock/user';

const MainLayout: React.FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, height: 50 }} mb={4}>
        <AppBar sx={{ padding: '8px 48px' }}>
          <Stack direction="row" justifyContent="space-between">
            <StyledLink to="home">
              <Stack alignItems="center" direction="row" spacing={2}>
                <Typography variant="h5">GitPanda</Typography>
                <Box sx={{ width: 30 }}>
                  <img src="/img/red-panda.svg" />
                </Box>
              </Stack>
            </StyledLink>

            <Stack alignItems="center" direction="row" spacing={2}>
              <StyledLink to="/info">
                <Button>User Info</Button>
              </StyledLink>
              <StyledLink to="/repositories">
                <Button>Repos</Button>
              </StyledLink>
              <Button>Logout</Button>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Avatar alt={user.name} src={user.avatar_url} />
            </Stack>
          </Stack>
        </AppBar>
      </Box>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
