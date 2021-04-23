import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC, useEffect, useMemo } from 'react';

import api from '~/api';
import { EpisodesTable, FeaturedEpisode } from '~/components/home';
import { usePlayer } from '~/contexts/PlayerContext';
import {
  Container,
  LatestEpisodesSection,
  AllEpisodesSection,
} from '~/styles/pages/HomePage';
import { Episode, EpisodeResponseItem } from '~/typings';
import { convertEpisodeResponseItemToEpisode } from '~/utils/episodes';

interface PageProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

const HomePage: FC<PageProps> = ({ latestEpisodes, allEpisodes }) => {
  const { loadEpisodes } = usePlayer();

  const nonLatestEpisodes = useMemo(() => allEpisodes.slice(2), [allEpisodes]);

  useEffect(() => {
    loadEpisodes(allEpisodes);
  }, [loadEpisodes, allEpisodes]);

  return (
    <Container>
      <Head>
        <title>Podcastr</title>
      </Head>
      <LatestEpisodesSection>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <FeaturedEpisode episode={episode} />
            </li>
          ))}
        </ul>
      </LatestEpisodesSection>
      <AllEpisodesSection>
        <h2>Todos os episódios</h2>
        <EpisodesTable episodes={nonLatestEpisodes} />
      </AllEpisodesSection>
    </Container>
  );
};

type EpisodesResponse = EpisodeResponseItem[];

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data } = await api.get<EpisodesResponse>('/episodes', {
    params: { _limit: 12, _sort: 'publishedAt', _order: 'desc' },
  });

  const episodes: Episode[] = data.map((episode, index) => ({
    ...convertEpisodeResponseItemToEpisode(episode),
    index,
  }));

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

export default HomePage;
