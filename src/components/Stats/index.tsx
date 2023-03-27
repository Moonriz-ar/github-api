import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  body: string | number | undefined | null;
}

const Stats = ({ title, body }: Props): JSX.Element => {
  return (
    <Stack>
      <Typography variant="body1">{title}</Typography>
      <Typography color="text.secondary" variant="body2">
        {body}
      </Typography>
    </Stack>
  );
};

export default Stats;
