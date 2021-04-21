import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};

  display: flex;
  align-items: center;

  position: relative;

  background-color: ${({ theme }) => theme.colors.white};

  > div:first-child {
    width: 6rem !important;
    height: 6rem !important;

    img {
      border-radius: 0.8rem;
    }
  }

  button {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    border-radius: 0.675rem;
    font-size: 0;

    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;

    background-color: ${({ theme }) => theme.colors.white};

    transition: filter 0.15s;

    :hover {
      filter: brightness(0.92);
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const EpisodeDetails = styled.div`
  height: 100%;

  flex: 1;
  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > div:first-child {
    display: grid;
    grid-template-columns: 1fr;
  }

  a {
    display: block;
    font-family: 'Lexend', sans-serif;
    color: ${({ theme }) => theme.colors.gray[800]};
    line-height: 1.4rem;
    font-weight: 600;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  p {
    margin-top: 0.5rem;
    width: calc(100% - 3.5rem);

    overflow: hidden;

    font-size: 0.875rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    margin-top: 1.5rem;
    display: inline-block;

    font-size: 0.875rem;
  }

  span + span {
    margin-left: 0.5rem;
    padding-left: 0.5rem;

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
`;
