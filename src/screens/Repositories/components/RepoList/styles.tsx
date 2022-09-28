import styled from 'styled-components';

import Grid from '@mui/material/Grid';

// height 100% is applied in the parent element of card
export const GridStyled = styled(Grid)`
  > * {
    height: 100%;
  }
`;
GridStyled.displayName = 'GridStyled';
