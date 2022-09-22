import { useContext } from 'react';

import { UserContext } from '../../context/userContext';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  const userContext = useContext(UserContext);

  return (
    <Stack alignItems="center">
      <Typography variant="h2" gutterBottom>
        Welcome,
      </Typography>
      {userContext && (
        <Typography variant="h2" color="primary" gutterBottom>
          {userContext.user?.login}
        </Typography>
      )}
    </Stack>
  );
};

export default Home;
