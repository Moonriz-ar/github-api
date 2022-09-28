import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Repo } from '../../../../types';

import { StyledAnchor, StyledLink } from '../../../../components/Links/styles';
import Stats from '../../../../components/Stats';
import Tag from '../../../../components/Tag/styles';
import { CardStyled, CardContentStyled } from './styles';

interface Props {
  repository: Repo;
}

const RepoCard = ({ repository }: Props) => {
  return (
    <CardStyled>
      <CardContentStyled>
        <Stack
          alignItems="start"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
            {repository.name}
          </Typography>
          {repository.fork && (
            <Tag variant="body2" color="text.secondary">
              forked
            </Tag>
          )}
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
      </CardContentStyled>
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
    </CardStyled>
  );
};

export default RepoCard;
