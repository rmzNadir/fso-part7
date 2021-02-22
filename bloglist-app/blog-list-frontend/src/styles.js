import styled from 'styled-components';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';

export const StyledToolbar = styled(Toolbar)`
  background: #cc2949;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > :first-child {
    display: flex;
    align-items: center;
  }
`;

export const AppBody = styled.div`
  width: 100vw;
  padding: 1rem;
`;
