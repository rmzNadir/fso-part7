import styled from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > :first-child {
    background: #242526;
    width: 40%;
  }

  .card-content {
    padding: 0 !important;
  }
`;

export const ActionsArea = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #18191a;
  border-bottom: 1px solid #18191a;
`;

export const MainInfo = styled.div`
  padding: 1rem;
`;

export const BlogsPosted = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  .blog-list-title {
    align-self: flex-start;
    margin-bottom: 0.5rem;
  }

  & .blogs-list {
    width: 100%;
    margin-bottom: 1rem;
    max-height: 240px;
    overflow-y: auto;
    border: 1px solid #3f4040;
    border-radius: 4px;
    padding: 0;
  }

  & .blog-list-content {
    display: flex;
    align-items: center;
  }
`;
