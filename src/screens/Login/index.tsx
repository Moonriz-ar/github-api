import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Login = () => {
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
        >
          <TextField id="username" label="Username" variant="filled" />
          <Button variant="contained">Login</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
