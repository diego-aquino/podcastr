import styled from 'styled-components';

export const Container = styled.header`
  height: 6.5rem;
  padding: 2rem 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  span {
    margin-left: auto;
    text-transform: capitalize;
  }
`;
