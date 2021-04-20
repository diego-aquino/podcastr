import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const Container = styled.header`
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
    display: grid;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, max-content);
    gap: 1rem;
  }

  span {
    font-family: 'Lexend', sans-serif;
    font-weight: 1rem;
  }
`;

type FeaturedPodcastMode = 'inactive' | 'active';

const featuredPodcastStyles: {
  [key in FeaturedPodcastMode]: FlattenSimpleInterpolation;
} = {
  inactive: css``,
  active: css``,
};

interface FeaturedPodcastProps {
  mode: FeaturedPodcastMode;
}

export const FeaturedPodcast = styled.div<FeaturedPodcastProps>`
  ${({ mode }) => featuredPodcastStyles[mode]}

  width: 100%;
  height: 20rem;
  border: 1.5px dashed ${({ theme }) => theme.colors.purple[300]};
  border-radius: 1.5rem;
  padding: 4rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

interface FooterProps {
  mode: 'inactive' | 'active';
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

export const Slider = styled.div`
  flex: 1;
  height: 0.25rem;
  background-color: ${({ theme }) => theme.colors.purple[300]};
  border-radius: 0.125rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  > * + * {
    margin-left: 1.5rem;
  }

  button {
    background: transparent;
    border: 0;
    font-size: 0;
  }
`;

export const PlayButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;

  && {
    background-color: ${({ theme }) => theme.colors.purple[400]};
  }
`;
