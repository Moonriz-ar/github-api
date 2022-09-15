import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ReposList from './components/ReposList';

import { userMock as user } from '../../mock/user';

const Repositories: React.FC = () => {
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [formValues, setFormValues] = useState({
    sort: 'created',
    direction: 'desc',
  });

  const onInputChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${user.login}/repos?sort=${formValues.sort}&direction=${formValues.direction}`
      );
      const repos = await response.json();
      setRepositories(repos);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(repositories);
  console.log(error);

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
      {loading ? (
        <Typography variant="subtitle1">Loading...</Typography>
      ) : (
        <ReposList repositories={repositories} />
      )}
    </>
  );
};

export default Repositories;
