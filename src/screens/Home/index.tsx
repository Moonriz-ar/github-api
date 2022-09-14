import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { userMock as user } from '../../mock/user';

const Home: React.FC = () => {
  return (
    <Stack alignItems="center">
      <Typography variant="h2" gutterBottom>
        Welcome,
      </Typography>
      <Typography variant="h2" color="primary" gutterBottom>
        {user.name}
      </Typography>
    </Stack>
  );
};

export default Home;
