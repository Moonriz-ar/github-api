import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { UserContext } from '../../context/userContext';

import { User } from '../../types/index';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState('');

  const onChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCurrentUser(e.target.value);
  };

  const onSubmitUsername = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<User | string> => {
    e.preventDefault();
    try {
      const responseUser = await fetch(
        `https://api.github.com/users/${currentUser}`
      );
      if (responseUser.status === 404) {
        Swal.fire({
          text: `Opps.. We coudn't find that user!`,
        });
      }
      if (!responseUser.ok) {
        throw new Error(`${responseUser.status} ${responseUser.statusText}`);
      }
      const userData = await responseUser.json();
      userContext.setUser(userData);
      navigate('/home');
      setCurrentUser('');
      return userData;
    } catch (err) {
      throw err;
    }
  };

  return (
    <Container>
      <Stack
        sx={{ height: '100vh' }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          alignItems="end"
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Box sx={{ width: 100 }}>
            <img src="/img/red-panda.svg" />
          </Box>
          <Typography variant="h2">GitPanda</Typography>
        </Stack>
        <Stack
          autoComplete="off"
          direction="row"
          component="form"
          justifyContent="center"
          noValidate
          spacing={2}
          onSubmit={onSubmitUsername}
        >
          <TextField
            id="username"
            label="Username"
            onChange={onChangeUsername}
            value={currentUser}
            variant="filled"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
