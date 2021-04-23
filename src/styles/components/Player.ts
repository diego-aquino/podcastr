import styled, { css } from 'styled-components';

export const Container = styled.aside`
  width: 26.5rem;
  height: 100vh;
  overflow-y: auto;
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
  border-radius: 1.5rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ mode }) =>
    mode === 'active' &&
    css`
      padding: 2rem 0;
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
      height: 20rem;
      padding: 4rem;
      border: 1.5px dashed ${({ theme }) => theme.colors.purple[300]};

      background-image: linear-gradient(
        143.8deg,
        rgba(145, 100, 250, 0.8) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    `}
`;

export const Footer = styled.footer`
  align-self: stretch;
`;

interface ProgressProps {
  inactive?: boolean;
}

export const Progress = styled.div<ProgressProps>`
  display: flex;
  align-items: center;

  font-size: 0.875rem;

  opacity: ${({ inactive }) => (inactive ? 0.5 : 1)};

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
  inactive?: boolean;
}

export const SliderContainer = styled.div<SliderProps>`
  flex: 1;

  ${({ inactive }) =>
    inactive &&
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
`;

interface ActionButtonProps {
  highlighted?: boolean;
}

export const ActionButton = styled.button<ActionButtonProps>`
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
    opacity: 0.5;
  }

  ${({ highlighted }) =>
    highlighted &&
    css`
      svg {
        filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
      }
    `}

  svg {
    transition: filter 0.15s;
  }
`;

export const PlayActionButton = styled(ActionButton)`
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  border-radius: 1rem;

  && {
    background-color: ${({ theme }) => theme.colors.purple[400]};
  }
`;
