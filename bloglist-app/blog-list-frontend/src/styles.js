import styled from 'styled-components';
import { Toolbar, Divider, AppBar } from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 !important;

  & > :first-child {
    width: max-content;
    max-height: auto;
  }
`;

export const StyledToolbar = styled(Toolbar)`
  padding: 0 !important;
  min-height: auto !important;

  & > :first-child {
    display: flex;
    align-items: center;
  }
`;

export const AppBody = styled.div`
  padding: 2rem;
`;

export const CurrentUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :first-child {
    margin-right: 1rem;
  }
`;

export const StyledDivider = styled(Divider)`
  background: #e0e0e0 !important;
  height: 30px !important;
  align-self: center !important;
`;
