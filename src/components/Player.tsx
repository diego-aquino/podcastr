import Image from 'next/image';
import Slider from 'rc-slider';
import React, { FC, useEffect, useRef } from 'react';
import 'rc-slider/assets/index.css';

import {
  PlayNextIcon,
  PlayPreviousIcon,
  PlayIcon,
  PlayingIcon,
  RepeatIcon,
  ShuffleIcon,
  PauseIcon,
} from '~/assets';
import { usePlayer } from '~/contexts/PlayerContext';
import {
  ActionButtons,
  Container,
  FeaturedPodcast,
  Footer,
  PlayButton,
  Progress,
  SliderContainer,
} from '~/styles/components/Player';

const Player: FC = () => {
  const { currentEpisode, pause, resume } = usePlayer();
  const { isPlaying } = currentEpisode || {};
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <Container>
      <header>
        <PlayingIcon aria-label="Tocando agora" />
        <span>{isPlaying ? `Tocando agora...` : 'Pausado'}</span>
      </header>

      <FeaturedPodcast mode={currentEpisode ? 'active' : 'inactive'}>
        {currentEpisode ? (
          <div>
            <Image
              src={currentEpisode.thumbnail}
              alt={currentEpisode.title}
              width={592}
              height={592}
              objectFit="cover"
            />
            <h3>{currentEpisode.title}</h3>
            <span>{currentEpisode.members}</span>
          </div>
        ) : (
          <span>Selecione um podcast para ouvir</span>
        )}
      </FeaturedPodcast>

      {currentEpisode && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          ref={audioRef}
          src={currentEpisode.url}
          autoPlay
          onPlay={resume}
          onPause={pause}
        />
      )}

      <Footer mode={currentEpisode ? 'active' : 'inactive'}>
        <Progress>
          <span>00:00</span>
          <SliderContainer mode={currentEpisode ? 'active' : 'inactive'}>
            {currentEpisode && (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            )}
          </SliderContainer>
          <span>00:00</span>
        </Progress>
        <ActionButtons>
          <button type="button" disabled={!currentEpisode}>
            <ShuffleIcon aria-label="Embaralhar" />
          </button>
          <button type="button" disabled={!currentEpisode}>
            <PlayPreviousIcon aria-label="Tocar anterior" />
          </button>
          <PlayButton
            type="button"
            onClick={() => (isPlaying ? pause() : resume())}
            disabled={!currentEpisode}
          >
            {isPlaying ? (
              <PauseIcon aria-label="Pausar" />
            ) : (
              <PlayIcon aria-label="Tocar" />
            )}
          </PlayButton>
          <button type="button" disabled={!currentEpisode}>
            <PlayNextIcon aria-label="Tocar próximo" />
          </button>
          <button type="button" disabled={!currentEpisode}>
            <RepeatIcon aria-label="Repetir" />
          </button>
        </ActionButtons>
      </Footer>
    </Container>
  );
};

export default Player;
