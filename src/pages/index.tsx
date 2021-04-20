import { GetStaticProps } from 'next';
import { FC } from 'react';

import api from '~/api';

interface EpisodeData {
  id: string;
  title: string;
}

interface PageProps {
  episodes: EpisodeData[];
}

const Home: FC<PageProps> = ({ episodes }) => (
  <div>
    {episodes.map((episode) => (
      <p key={episode.id}>{episode.title}</p>
    ))}
  </div>
);

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data: episodes } = await api.get('/episodes');

  return {
    props: { episodes },
    revalidate: 60 * 60 * 8,
  };
};

export default Home;
