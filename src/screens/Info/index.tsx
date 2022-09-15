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

import { userMock as user } from '../../mock/user';

const Info: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" direction="row" mb={2} spacing={2}>
          <Avatar alt={user.name} src={user.avatar_url} />
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" my={2} spacing={8}>
          <Stats title="Followers" body={user.followers} />
          <Stats title="Following" body={user.following} />
          <Stats title="Repos" body={user.public_repos} />
        </Stack>
        {user.bio && (
          <Stack>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {user.bio}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Button>
          <StyledAnchor href={user.html_url} rel="noopener" target="_blank">
            Open on Github
          </StyledAnchor>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Info;
