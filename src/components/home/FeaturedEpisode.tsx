import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { PlayGreenIcon } from '~/assets';
import { usePlayer } from '~/contexts/PlayerContext';
import {
  Container,
  EpisodeDetails,
} from '~/styles/components/home/FeaturedEpisode';
import { Episode } from '~/typings';

interface Props {
  episode: Episode;
}

const LatestEpisode: FC<Props> = ({ episode }) => {
  const { startPlaying } = usePlayer();

  return (
    <Container>
      <Image
        src={episode.thumbnail}
        alt={episode.title}
        width={192}
        height={192}
        layout="fixed"
        objectFit="cover"
      />

      <EpisodeDetails>
        <div>
          <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
          <p>{episode.members}</p>
        </div>
        <div>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </div>
      </EpisodeDetails>

      <button type="button" onClick={() => startPlaying(episode)}>
        <PlayGreenIcon aria-label="Tocar episódio" />
      </button>
    </Container>
  );
};

export default LatestEpisode;
