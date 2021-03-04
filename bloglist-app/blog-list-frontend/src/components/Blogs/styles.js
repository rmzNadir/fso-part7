import styled from 'styled-components';

export const BlogsArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;

  .blogs-card {
    background: #242526;
  }

  .card-content {
    padding: 0 !important;
  }
`;

export const MainInfo = styled.div`
  padding: 1rem 1rem 0.5rem 1rem;
  border-bottom: 1px solid #1b1b1b;
`;

export const ExtraInfo = styled.div`
  padding: 1rem;
`;
