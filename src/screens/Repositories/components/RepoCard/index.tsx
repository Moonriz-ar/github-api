import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledAnchor, StyledLink } from '../../../../components/Links/styles';
import Stats from '../../../../components/Stats';
import Tag from '../../../../components/Tag/styles';

import { Repo } from '../../../../types';

interface Props {
  repository: Repo;
}

const RepoCard = ({ repository }: Props) => {
  return (
    <Card>
      <CardContent>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
            {repository.name}
          </Typography>
          {repository.fork ? (
            <Tag variant="body2" color="text.secondary">
              forked
            </Tag>
          ) : undefined}
        </Stack>
        <Divider />
        <Stack direction="row" marginY={2} spacing={4}>
          <Stats title="Language" body={repository.language} />
          <Stats title="Stars" body={repository.stargazers_count} />
          <Stats title="Watchers" body={repository.watchers_count} />
        </Stack>
        <Box>
          <Stats title="Description" body={repository.description} />
        </Box>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Button>
            <StyledAnchor
              href={repository.html_url}
              rel="noopener"
              target="_blank"
            >
              Open on Github
            </StyledAnchor>
          </Button>
          <Button>
            <StyledLink to={`${repository.name}`}>See Details</StyledLink>
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default RepoCard;
