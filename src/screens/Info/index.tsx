import { useContext } from 'react';

import { UserContext } from '../../context/userContext';

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
  const userContext = useContext(UserContext);

  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" direction="row" mb={2} spacing={2}>
          <Avatar
            alt={userContext.user?.name}
            src={userContext.user?.avatar_url}
          />
          <Typography variant="h5" gutterBottom>
            {userContext.user?.name}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" my={2} spacing={8}>
          <Stats title="Followers" body={userContext.user?.followers} />
          <Stats title="Following" body={userContext.user?.following} />
          <Stats title="Repos" body={userContext.user?.public_repos} />
        </Stack>
        {userContext.user?.bio && (
          <Stack>
            <Typography variant="h6" gutterBottom>
              Bio
            </Typography>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {userContext.user?.bio}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Button>
          <StyledAnchor
            href={userContext.user?.html_url}
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
