import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;
StyledLink.displayName = 'StyledLink';

export const StyledAnchor = styled.a`
  all: unset;
  cursor: pointer;
`;
StyledAnchor.displayName = 'StyledAnchor';
