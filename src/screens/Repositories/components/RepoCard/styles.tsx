import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// styles to make card take up 100%
export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
CardStyled.displayName = 'CardStyled';

// style to make card content grow the maximum possible, pushing buttons always to the bottom
export const CardContentStyled = styled(CardContent)`
  flex-grow: 1;
`;
CardContentStyled.displayName = 'CardContentStyled';
