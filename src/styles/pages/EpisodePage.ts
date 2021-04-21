import styled from 'styled-components';

export const Container = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

    h1 {
      margin: 2rem 0 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;
    }

    span + span {
      margin-left: 1rem;
      padding-left: 1rem;

      position: relative;

      ::before {
        content: '';
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 0.25rem;

        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);

        background-color: #ddd;
      }
    }
  }
`;

export const CoverContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    width: 3rem;
    height: 3rem;
    border: 0;
    border-radius: 0.75rem;

    position: absolute;
    z-index: 1;
    top: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.15s;

    :first-child {
      left: 0;
      transform: translate(-50%, -50%);
      background-color: ${({ theme }) => theme.colors.purple[500]};
    }

    :last-child {
      right: 0;
      transform: translate(50%, -50%);
      background-color: ${({ theme }) => theme.colors.green[500]};
    }

    :hover {
      filter: brightness(0.9);
    }
  }
`;

export const Description = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: ${({ theme }) => theme.colors.gray[800]};

  p {
    margin: 1.5rem 0;
  }
`;
