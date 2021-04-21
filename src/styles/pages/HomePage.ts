import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 6.5rem);
  overflow-y: auto;
  padding: 0 4rem;
`;

const Section = styled.section`
  h2 {
    margin: 3rem 0 1.5rem;
  }
`;

export const LatestEpisodesSection = styled(Section)`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 1.5rem;

    li {
      height: 100%;
    }
  }
`;

export const AllEpisodesSection = styled(Section)`
  padding-bottom: 2rem;
`;
