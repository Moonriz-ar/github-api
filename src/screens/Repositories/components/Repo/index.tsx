import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { store, useSnapshot } from '../../../../store/store';

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

import Stats from '../../../../components/Stats';
import { StyledAnchor } from '../../../../components/Links/styles';
import Tag from '../../../../components/Tag/styles';

import { RepoResponseFromApi } from '../../../../types';

const getRepo = async (
  username: string | undefined,
  repoName: string | undefined
): Promise<RepoResponseFromApi> => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const data = await response.json();
  return data;
};

const getLanguages = async (
  username: string | undefined,
  repoName: string | undefined
): Promise<RepoResponseFromApi> => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  const data = await response.json();
  return data;
};

const Repository = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();
  const snap = useSnapshot(store);

  const username = snap ? snap.user?.login : '';

  const {
    isLoading: isLoadingRepo,
    error: errorRepo,
    data: dataRepo,
  } = useQuery<RepoResponseFromApi, Error>({
    queryKey: ['dataRepo', username, repoName],
    queryFn: () => getRepo(username, repoName),
    select: (dataRepo) => {
      return {
        ...dataRepo,
        created_at: dataRepo.created_at.slice(0, 10),
        description: dataRepo.description
          ? dataRepo.description
          : 'No Description',
        pushed_at: dataRepo.pushed_at.slice(0, 10),
        updated_at: dataRepo.updated_at.slice(0, 10),
      };
    },
  });

  const {
    isLoading: isLoadingLanguages,
    error: errorLanguages,
    data: dataLanguages,
  } = useQuery({
    queryKey: ['dataLanguages', username, repoName],
    queryFn: () => getLanguages(username, repoName),
    select: (data) => {
      const result = [];
      const total = Object.values(data).reduce(
        (sum, current) => sum + current,
        0
      );
      for (const [key, value] of Object.entries(data)) {
        result.push({
          name: key,
          percentage: (value / total) * 100,
        });
      }
      return result;
    },
  });

  if (errorRepo) return 'An error has occurred';
  if (errorLanguages) return 'An error has occurred';

  return (
    <>
      {(isLoadingRepo || isLoadingLanguages) && (
        <Typography variant="subtitle1">Loading...</Typography>
      )}
      {dataRepo && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {dataRepo.name}
            </Typography>
            <Divider />
            <Box my={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Stats title="Created At" body={dataRepo.created_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Updated At" body={dataRepo.updated_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Pushed At" body={dataRepo.pushed_at} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Watchers" body={dataRepo.watchers_count} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Forks" body={dataRepo.forks_count} />
                </Grid>
                <Grid item xs={4}>
                  <Stats title="Stars" body={dataRepo.stargazers_count} />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Stats title="Description" body={dataRepo.description} />
            </Box>
            {dataLanguages && (
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Languages
                </Typography>
                <Stack direction="row" spacing={2}>
                  {dataLanguages.map((language) => (
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
                  href={dataRepo.html_url}
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
      <Snackbar open={!!errorRepo}>
        <Alert elevation={6} severity="error" variant="filled">
          Oh, there was an error in the request
        </Alert>
      </Snackbar>
    </>
  );
};

export default Repository;
