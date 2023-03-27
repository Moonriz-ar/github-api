import { store, useSnapshot } from '../../store/store';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  const snap = useSnapshot(store);

  return (
    <Stack alignItems="center">
      <Typography variant="h2" gutterBottom>
        Welcome,
      </Typography>
      {snap.user && (
        <Typography variant="h2" color="primary" gutterBottom>
          {snap.user?.login}
        </Typography>
      )}
    </Stack>
  );
};

export default Home;
