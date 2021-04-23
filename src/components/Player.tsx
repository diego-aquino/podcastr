import Image from 'next/image';
import Slider from 'rc-slider';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { PlayerContextProvider, usePlayer } from '~/contexts/PlayerContext';
import {
  ActionButtons,
  ActionButton,
  Container,
  FeaturedPodcast,
  Footer,
  PlayActionButton,
  Progress,
  SliderContainer,
} from '~/styles/components/Player';
import { convertDurationToTimeString } from '~/utils/date';

const Player: FC = () => {
  const player = usePlayer();
  const { currentEpisode } = player;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progressInSeconds, setProgressInSeconds] = useState(0);

  const progressAsString = useMemo(
    () =>
      currentEpisode ? convertDurationToTimeString(progressInSeconds) : '00:00',
    [currentEpisode, progressInSeconds],
  );

  useEffect(() => {
    if (player.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [player.isPlaying]);

  const onAudioLoad = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
  }, []);

  const onAudioTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;

    const newProgress = Math.floor(audioRef.current.currentTime);
    setProgressInSeconds(newProgress);
  }, []);

  const onSliderChange = useCallback((value: number) => {
    if (!audioRef.current) return;

    const newProgress = Math.floor(value);
    audioRef.current.currentTime = newProgress;
    setProgressInSeconds(newProgress);
  }, []);

  const onAudioEnd = useCallback(() => {
    if (player.hasNext) {
      player.playNext();
    } else {
      player.clear();
    }
  }, [player]);

  return (
    <Container>
      <header>
        <PlayingIcon aria-label="Tocando agora" />
        <span>{player.isPlaying ? `Tocando agora...` : 'Pausado'}</span>
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
          onPlay={player.resume}
          onPause={player.pause}
          onEnded={onAudioEnd}
          onLoadedMetadata={onAudioLoad}
          onTimeUpdate={onAudioTimeUpdate}
        />
      )}

      <Footer>
        <Progress inactive={!currentEpisode}>
          <span>{progressAsString}</span>
          <SliderContainer inactive={!currentEpisode}>
            {currentEpisode && (
              <Slider
                value={progressInSeconds}
                min={0}
                max={currentEpisode.durationInSeconds}
                onChange={onSliderChange}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            )}
          </SliderContainer>
          <span>{currentEpisode?.durationAsString ?? '00:00'}</span>
        </Progress>
        <ActionButtons>
          <ActionButton
            type="button"
            highlighted={player.isShuffleActive}
            onClick={player.toggleShuffle}
            disabled={!currentEpisode || player.episodes.length === 1}
          >
            <ShuffleIcon aria-label="Embaralhar" />
          </ActionButton>
          <ActionButton
            type="button"
            onClick={player.playPrevious}
            disabled={
              !currentEpisode ||
              (!player.hasPrevious && !player.isLoopActive) ||
              player.episodes.length === 1
            }
          >
            <PlayPreviousIcon aria-label="Tocar anterior" />
          </ActionButton>
          <PlayActionButton
            type="button"
            onClick={player.isPlaying ? player.pause : player.resume}
            disabled={!currentEpisode}
          >
            {player.isPlaying ? (
              <PauseIcon aria-label="Pausar" />
            ) : (
              <PlayIcon aria-label="Tocar" />
            )}
          </PlayActionButton>
          <ActionButton
            type="button"
            onClick={player.playNext}
            disabled={
              !currentEpisode ||
              (!player.hasNext && !player.isLoopActive) ||
              player.episodes.length === 1
            }
          >
            <PlayNextIcon aria-label="Tocar próximo" />
          </ActionButton>
          <ActionButton
            type="button"
            highlighted={player.isLoopActive}
            onClick={player.toggleLoop}
            disabled={!currentEpisode}
          >
            <RepeatIcon aria-label="Repetir" />
          </ActionButton>
        </ActionButtons>
      </Footer>
    </Container>
  );
};

export default Player;
