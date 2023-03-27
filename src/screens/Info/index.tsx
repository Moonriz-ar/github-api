import { store, useSnapshot } from '../../store/store';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Stats from '../../components/Stats';
import { StyledAnchor } from '../../components/Links/styles';

const Info: React.FC = () => {
  const snap = useSnapshot(store);

  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" direction="row" mb={2} spacing={2}>
          <Avatar alt={snap.user?.name} src={snap.user?.avatar_url} />
          <Typography variant="h5" gutterBottom>
            {snap.user?.name}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" my={2} spacing={8}>
          <Stats title="Followers" body={snap.user?.followers} />
          <Stats title="Following" body={snap.user?.following} />
          <Stats title="Repos" body={snap.user?.public_repos} />
        </Stack>
        {snap.user?.bio && (
          <Stack>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {snap.user?.bio}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Button>
          <StyledAnchor
            href={snap.user?.html_url}
            rel="noopener"
            target="_blank"
          >
            Open on Github
          </StyledAnchor>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Info;
