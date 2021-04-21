import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';

import api from '~/api';
import { EpisodesTable, FeaturedEpisode } from '~/components/home';
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

const HomePage: FC<PageProps> = ({ latestEpisodes, allEpisodes }) => (
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
      <EpisodesTable episodes={allEpisodes} />
    </AllEpisodesSection>
  </Container>
);

type EpisodesResponse = EpisodeResponseItem[];

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data } = await api.get<EpisodesResponse>('/episodes', {
    params: { _limit: 12, _sort: 'publishedAt', _order: 'desc' },
  });

  const episodes: Episode[] = data.map(convertEpisodeResponseItemToEpisode);

  return {
    props: {
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2),
    },
    revalidate: 60 * 60 * 8,
  };
};

export default HomePage;
