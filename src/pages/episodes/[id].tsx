import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import React, { FC, useCallback } from 'react';

import api from '~/api';
import { ArrowLeftIcon, PlayIcon } from '~/assets';
import { usePlayer } from '~/contexts/PlayerContext';
import {
  Container,
  CoverContainer,
  Description,
} from '~/styles/pages/EpisodePage';
import { Episode, EpisodeResponseItem } from '~/typings';
import { convertEpisodeResponseItemToEpisode } from '~/utils/episodes';

interface PageProps {
  episode: Episode;
}

const EpisodePage: FC<PageProps> = ({ episode }) => {
  const { startPlaying } = usePlayer();
  const router = useRouter();

  const returnToHomePage = useCallback(() => router.push('/'), [router]);

  return (
    <Container>
      <Head>
        <title>{`Podcastr | ${episode.title}`}</title>
      </Head>
      <div>
        <CoverContainer>
          <button type="button" onClick={returnToHomePage}>
            <ArrowLeftIcon aria-label="Voltar" />
          </button>
          {episode && (
            <Image
              src={episode.thumbnail}
              width={700}
              height={160}
              objectFit="cover"
            />
          )}
          <button type="button" onClick={() => startPlaying(episode)}>
            <PlayIcon aria-label="Tocar episódio" />
          </button>
        </CoverContainer>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <Description
          dangerouslySetInnerHTML={{ __html: episode?.description ?? '' }}
        />
      </div>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: episodes } = await api.get<EpisodeResponseItem[]>('/episodes', {
    params: { _limit: 2, _sort: 'publishedAt', _order: 'desc' },
  });

  const paths = episodes.map((episode) => ({
    params: {
      id: episode.id,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { id } = context.params || {};

  if (!id) {
    return { notFound: true };
  }

  try {
    const { data: episodeItem } = await api.get<EpisodeResponseItem>(
      `/episodes/${id}`,
    );

    return {
      props: {
        episode: convertEpisodeResponseItemToEpisode(episodeItem),
      },
      revalidate: 60 * 60 * 24 * 30,
    };
  } catch {
    return { notFound: true };
  }
};

export default EpisodePage;
