import styled from 'styled-components';

export const LoginFormSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > :first-child {
    background: #242526;
    width: 30%;
  }
`;

export const FieldSpace = styled.div`
  > * {
    width: 100%;
    margin-top: 2rem !important;
  }

  #submitButton {
    height: 4rem;
  }
`;
