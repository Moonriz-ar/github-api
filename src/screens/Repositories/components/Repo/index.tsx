import { useNavigate, useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFetchRepo } from '../../../../hooks/useFetchRepo';

import Stats from '../../../../components/Stats';
import { StyledAnchor } from '../../../../components/Links/styles';
import Tag from '../../../../components/Tag/styles';

const Repository = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();
  const { state } = useFetchRepo(repoName);
  const { isLoading, error, repositoryData, languages } = state;

  return (
    <>
      {isLoading && <Typography variant="subtitle1">Loading...</Typography>}
      {repositoryData && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {repositoryData.name}
            </Typography>
            <Divider />
            <Box my={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Stats title="Created At" body={repositoryData.created_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Updated At" body={repositoryData.updated_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Pushed At" body={repositoryData.pushed_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats
                    title="Watchers"
                    body={repositoryData.watchers_count}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Forks" body={repositoryData.forks_count} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Stars" body={repositoryData.stargazers_count} />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Stats title="Description" body={repositoryData.description} />
            </Box>
            {languages && (
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Languages
                </Typography>
                <Stack direction="row" spacing={2}>
                  {languages.map((language) => (
                    <Tag color="secondary" key={language.name} variant="body2">
                      {language.name} ({language.percentage.toFixed(2)}%)
                    </Tag>
                  ))}
                </Stack>
              </Box>
            )}
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Button onClick={() => navigate(-1)}>Go Back</Button>
              <Button>
                <StyledAnchor
                  href={repositoryData.html_url}
                  rel="noopener"
                  target="_blank"
                >
                  Open On Github
                </StyledAnchor>
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}
      <Snackbar open={!!error}>
        <Alert elevation={6} severity="error" variant="filled">
          Oh, there was an error in the request
        </Alert>
      </Snackbar>
    </>
  );
};

export default Repository;
