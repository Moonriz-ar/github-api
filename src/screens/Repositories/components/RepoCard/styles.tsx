import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// styles apply display flex and column direction for card content and card actions
export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
`;
CardStyled.displayName = 'CardStyled';

// style to make card content grow the maximum possible, pushing buttons always to the bottom
export const CardContentStyled = styled(CardContent)`
  flex-grow: 1;
`;
CardContentStyled.displayName = 'CardContentStyled';
