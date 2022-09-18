import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Repo } from '../../../../types';
import RepoCard from '../RepoCard';

interface Props {
  repositories: Array<Repo> | null;
}

const ReposList = ({ repositories }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} my={4}>
      <Grid container spacing={2}>
        {repositories?.map((repository) => (
          <Grid item key={repository.id} xs={12} md={6} lg={4}>
            <RepoCard repository={repository} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReposList;
