import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Episode } from '~/typings';

type CurrentEpisode =
  | (Episode & {
      index: number;
      isPlaying: boolean;
    })
  | null;

interface PlayerContextValue {
  episodes: Episode[];
  currentEpisode: CurrentEpisode;
  startPlaying: (episode: Episode) => void;
  pause: () => void;
  resume: () => void;
}

const PlayerContext = createContext<PlayerContextValue>(
  {} as PlayerContextValue,
);

export const PlayerContextProvider: FC = ({ children }) => {
  const [queuedEpisodes, setQueuedEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<CurrentEpisode>(null);

  const changePlayingState = useCallback((newPlayingState: boolean) => {
    setCurrentEpisode((episode) => {
      if (!episode) return null;
      return { ...episode, isPlaying: newPlayingState };
    });
  }, []);

  const queue = useCallback((episode: Episode) => {
    setQueuedEpisodes((currentQueuedEpisodes) => [
      ...currentQueuedEpisodes,
      episode,
    ]);
  }, []);

  const startPlaying = useCallback(
    (episode: Episode) => {
      setCurrentEpisode((currentCurrentEpisode) => {
        const episodeIsAlreadyCurrent =
          episode.id === currentCurrentEpisode?.id;

        if (episodeIsAlreadyCurrent) {
          return currentCurrentEpisode;
        }

        const newEpisodeIndex = queuedEpisodes.length;
        queue(episode);
        return { ...episode, index: newEpisodeIndex, isPlaying: true };
      });
    },
    [queuedEpisodes, queue],
  );

  const pause = useCallback(() => {
    changePlayingState(false);
  }, [changePlayingState]);

  const resume = useCallback(() => {
    changePlayingState(true);
  }, [changePlayingState]);

  useEffect(() => {
    console.log(queuedEpisodes);
  }, [queuedEpisodes]);

  return (
    <PlayerContext.Provider
      value={{
        episodes: queuedEpisodes,
        currentEpisode,
        startPlaying,
        pause,
        resume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayerContextValue {
  return useContext(PlayerContext);
}
