import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  th {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-transform: uppercase;
    font: 500 0.75rem 'Lexend', sans-serif;
    text-align: left;
  }

  td {
    font-size: 0.875rem;

    img {
      border-radius: 0.5rem;
    }

    a {
      color: ${({ theme }) => theme.colors.gray[800]};
      font-family: 'Lexend', sans-serif;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;
      font-size: 1rem;

      :hover {
        text-decoration: underline;
      }
    }

    button {
      width: 2rem;
      height: 2rem;
      border: 1px solid ${({ theme }) => theme.colors.gray[100]};
      border-radius: 0.675rem;
      font-size: 0;

      background-color: ${({ theme }) => theme.colors.white};

      transition: filter 0.15s;

      :hover {
        filter: brightness(0.92);
      }

      img {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  td:first-child {
    text-align: center;

    > div {
      width: 3.5rem !important;
      height: 3.5rem !important;
    }
  }

  td:nth-child(4) {
    min-width: 7rem;
  }
`;
