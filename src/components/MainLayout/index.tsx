import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { store, useSnapshot, setUser } from '../../store/store';

import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledLink } from '../Links/styles';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const snap = useSnapshot(store);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<HTMLDivElement | null>(null);

  const onOpenUserMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setAnchorElUser(event.currentTarget);
  };

  const onCloseUserMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    setAnchorElUser(null);
  };

  const onClickLogout = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, height: 50 }} mb={4}>
        <AppBar sx={{ padding: '8px 0px' }}>
          <Container>
            <Stack direction="row" justifyContent="space-between">
              <StyledLink to="/">
                <Stack alignItems="end" direction="row" spacing={2}>
                  <Box sx={{ width: 30 }}>
                    <img src="/img/red-panda.svg" />
                  </Box>
                  <Typography variant="h5">GitPanda</Typography>
                </Stack>
              </StyledLink>

              <Stack alignItems="center" direction="row" spacing={2}>
                <StyledLink to="/info">
                  <Button>User Info</Button>
                </StyledLink>
                <StyledLink to="/repositories">
                  <Button>Repos</Button>
                </StyledLink>

                <section>
                  <Box
                    onClick={onOpenUserMenu}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Typography variant="subtitle2">
                      {snap.user?.name}
                    </Typography>
                    <Avatar alt={snap.user?.name} src={snap.user?.avatar_url} />
                  </Box>
                  <Menu
                    id="menu-user"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={onCloseUserMenu}
                    sx={{ mt: '48px' }}
                  >
                    <MenuItem onClick={onCloseUserMenu}>
                      <Typography onClick={onClickLogout}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </section>
              </Stack>
            </Stack>
          </Container>
        </AppBar>
      </Box>
      <Container>
        <Box mb={4}>{children}</Box>
      </Container>
    </>
  );
};

export default MainLayout;
