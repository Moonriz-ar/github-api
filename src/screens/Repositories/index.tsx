import React, { useState, useEffect } from 'react';
import { store, useSnapshot } from '../../store/store';
import { useQuery } from '@tanstack/react-query';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ReposResponseFromApi } from '../../types';
import ReposList from './components/RepoList';

const getRepos = async (
  username: string | undefined,
  sort: string,
  direction: string
): Promise<ReposResponseFromApi> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}`
  );
  const data = await response.json();
  return data;
};

const Repo: React.FC = () => {
  const snap = useSnapshot(store);
  const username = snap ? snap.user?.login : '';
  const [formValues, setFormValues] = useState({
    sort: 'created',
    direction: 'asc',
  });

  const {
    isLoading: isLoadingRepos,
    error: errorRepos,
    data: dataRepos,
    refetch,
  } = useQuery<ReposResponseFromApi, Error>({
    queryKey: ['dataRepos', username],
    queryFn: () => getRepos(username, formValues.sort, formValues.direction),
    enabled: false,
    select: (dataRepos) => {
      var reposCopy = dataRepos;
      reposCopy.forEach((repo) => {
        repo.description ? repo.description : 'No Description';
      });
      return reposCopy;
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const onInputChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <form id="sort-form" onSubmit={onSubmit}>
        <Stack direction="row" spacing={4}>
          <Box sx={{ minWidth: 150 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="sort-label">Sort By:</InputLabel>
              <Select
                id="sort"
                label="sort"
                labelId="sort-label"
                name="sort"
                onChange={onInputChange}
                value={formValues.sort}
              >
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="updated">Updated</MenuItem>
                <MenuItem value="pushed">Pushed</MenuItem>
                <MenuItem value="full_name">Full name</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="direction-label">Sort direction:</InputLabel>
              <Select
                id="direction"
                label="direction"
                labelId="direction-label"
                name="direction"
                onChange={onInputChange}
                value={formValues.direction}
              >
                <MenuItem value="asc">Asc</MenuItem>
                <MenuItem value="desc">Desc</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" type="submit">
            Sort
          </Button>
        </Stack>
      </form>
      {isLoadingRepos && (
        <Typography variant="subtitle1">Loading...</Typography>
      )}
      {dataRepos && <ReposList repositories={dataRepos} />}
      <Snackbar open={!!errorRepos}>
        <Alert elevation={6} severity="error" variant="filled">
          Oh, there was an error in the request
        </Alert>
      </Snackbar>
    </>
  );
};

export default Repo;
