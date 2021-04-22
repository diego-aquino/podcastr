import styled, { css } from 'styled-components';

export const Container = styled.aside`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.purple[500]};

  header {
    display: flex;
    align-items: center;

    svg {
      margin-right: 1rem;
      min-width: 2rem;
    }
  }

  span {
    font-family: 'Lexend', sans-serif;
    font-weight: 1rem;
  }
`;

interface FeaturedPodcastProps {
  mode: 'active' | 'inactive';
}

export const FeaturedPodcast = styled.div<FeaturedPodcastProps>`
  width: 100%;
  height: 20rem;
  border-radius: 1.5rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ mode }) =>
    mode === 'active' &&
    css`
      text-align: center;

      img {
        border-radius: 1.5rem;
      }

      h3 {
        margin-top: 2rem;

        font: 600 1.25rem 'Lexend', sans-serif;
        line-height: 1.75rem;

        color: ${({ theme }) => theme.colors.white};
      }

      span {
        margin-top: 1rem;
        display: block;
        line-height: 1.5rem;
        opacity: 0.6;
      }
    `}

  ${({ mode }) =>
    mode === 'inactive' &&
    css`
      padding: 4rem;
      border: 1.5px dashed ${({ theme }) => theme.colors.purple[300]};

      background-image: linear-gradient(
        143.8deg,
        rgba(145, 100, 250, 0.8) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    `}
`;

interface FooterProps {
  mode: 'active' | 'inactive';
}

export const Footer = styled.footer<FooterProps>`
  align-self: stretch; // width: 100%;
  opacity: ${({ mode }) => (mode === 'inactive' ? 0.5 : 1)};
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;

  font-size: 0.875rem;

  > * + * {
    margin-left: 0.5rem;
  }

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`;

interface SliderProps {
  mode: 'active' | 'inactive';
}

export const SliderContainer = styled.div<SliderProps>`
  flex: 1;

  ${({ mode }) =>
    mode === 'inactive' &&
    css`
      height: 0.25rem;
      background-color: ${({ theme }) => theme.colors.purple[300]};
      border-radius: 0.125rem;
    `}
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.75rem;

  > * + * {
    margin-left: 0.75rem;
  }

  button {
    padding: 0.75rem;
    border: 0;
    border-radius: 0.75rem;
    font-size: 0;
    background-color: transparent;
    transition: background-color 0.15s;

    :hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.purple[400]};
    }

    :disabled {
      cursor: default;
    }
  }
`;

export const PlayButton = styled.button`
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  border-radius: 1rem;

  && {
    background-color: ${({ theme }) => theme.colors.purple[400]};
  }
`;
