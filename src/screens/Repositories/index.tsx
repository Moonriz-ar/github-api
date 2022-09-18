import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFetch } from '../../hooks/useFetchRepos';
import ReposList from './components/RepoList';

import { userMock as user } from '../../mocks/user';

const Repositories: React.FC = () => {
  const { dispatch, state, fetchRepos, mapFromApiToRepos } = useFetch(
    `https://api.github.com/users/${user.login}/repos`
  );
  const { isLoading, error } = state;
  const repositories = state.data;
  const [formValues, setFormValues] = useState({
    sort: 'created',
    direction: 'desc',
  });

  useEffect(() => {
    try {
      dispatch({ type: 'REQUEST_STARTED' });
      fetchRepos()
        .then(mapFromApiToRepos)
        .then((data) =>
          dispatch({ type: 'REQUEST_SUCCESSFUL', payload: data })
        );
    } catch (err) {
      console.log(err);
      dispatch({ type: 'REQUEST_FAILED', error: err.message });
    }
  }, []);

  const onInputChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
  //   e.preventDefault();
  //   try {
  //     const params = {
  //       direction: formValues.direction,
  //       sort: formValues.sort,
  //     };
  //     dispatch({ type: 'REQUEST_STARTED' });
  //     fetchRepos(params).then((response) => console.log(response));
  //     // .then(mapFromApiToRepos)
  //     // .then((data) =>
  //     //   dispatch({ type: 'REQUEST_SUCCESSFUL', payload: data })
  //     // );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <form id="sort-form" onSubmit={() => console.log('hi')}>
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
      {isLoading ? (
        <Typography variant="subtitle1">Loading...</Typography>
      ) : (
        <ReposList repositories={repositories} />
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Repositories;
