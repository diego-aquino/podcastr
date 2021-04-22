import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { PlayGreenIcon } from '~/assets';
import { usePlayer } from '~/contexts/PlayerContext';
import { Container } from '~/styles/components/home/EpisodesTable';
import { Episode } from '~/typings';

interface Props {
  episodes: Episode[];
}

const EpisodesTable: FC<Props> = ({ episodes }) => {
  const { startPlaying } = usePlayer();

  const renderEpisodeTableRow = (episode: Episode) => (
    <tr key={episode.id}>
      <td>
        <Image
          src={episode.thumbnail}
          alt={episode.title}
          width={120}
          height={120}
          layout="fixed"
          objectFit="cover"
        />
      </td>
      <td>
        <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
      </td>
      <td>{episode.members}</td>
      <td>{episode.publishedAt}</td>
      <td>{episode.durationAsString}</td>
      <td>
        <button type="button" onClick={() => startPlaying(episode)}>
          <PlayGreenIcon aria-label="Tocar episódio" />
        </button>
      </td>
    </tr>
  );

  return (
    <Container cellSpacing={0}>
      <thead>
        <tr>
          <th> </th>
          <th>Podcast</th>
          <th>Integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>{episodes.map(renderEpisodeTableRow)}</tbody>
    </Container>
  );
};

export default EpisodesTable;
