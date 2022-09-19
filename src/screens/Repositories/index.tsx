import React, { useState } from 'react';

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

import { useFetchRepos } from '../../hooks/useFetchRepos';
import ReposList from './components/RepoList';

const Repo: React.FC = () => {
  const { state, fetchRepos } = useFetchRepos();
  const { isLoading, error } = state;
  const repositories = state.data;

  const [formValues, setFormValues] = useState({
    sort: 'created',
    direction: 'desc',
  });

  const onInputChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetchRepos({ direction: formValues.direction, sort: formValues.sort });
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
      {isLoading && <Typography variant="subtitle1">Loading...</Typography>}
      {repositories && <ReposList repositories={repositories} />}
      <Snackbar open={!!error}>
        <Alert elevation={6} severity="error" variant="filled">
          Oh, there was an error in the request
        </Alert>
      </Snackbar>
    </>
  );
};

export default Repo;
