import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Episode } from '~/typings';

interface PlayerContextValue {
  episodes: Episode[];
  currentEpisode: Episode | null;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  isLoopActive: boolean;
  isShuffleActive: boolean;
  loadEpisodes: (episodes: Episode[]) => void;
  startPlaying: (episodeIndex: number) => void;
  startPlayingOne: (episode: Episode) => void;
  resume: () => void;
  pause: () => void;
  playPrevious: () => void;
  playNext: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clear: () => void;
}

const PlayerContext = createContext<PlayerContextValue>(
  {} as PlayerContextValue,
);

export const PlayerContextProvider: FC = ({ children }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);

  const currentEpisode =
    currentEpisodeIndex >= 0 ? episodes[currentEpisodeIndex] : null;

  const hasPrevious = useMemo(() => {
    if (episodes.length === 0) return false;
    if (isShuffleActive || isLoopActive) return true;
    return currentEpisodeIndex > 0;
  }, [currentEpisodeIndex, episodes.length, isLoopActive, isShuffleActive]);

  const hasNext = useMemo(() => {
    if (episodes.length === 0) return false;
    if (isShuffleActive || isLoopActive) return true;
    return currentEpisodeIndex < episodes.length - 1;
  }, [currentEpisodeIndex, episodes.length, isLoopActive, isShuffleActive]);

  const loadEpisodes = useCallback((episodesToLoad: Episode[]) => {
    setEpisodes(episodesToLoad);
  }, []);

  const changePlayingState = useCallback((newPlayingState?: boolean) => {
    setIsPlaying((currentPlayingState) =>
      newPlayingState === undefined ? !currentPlayingState : newPlayingState,
    );
  }, []);

  const startPlaying = useCallback((episodeIndex: number) => {
    setCurrentEpisodeIndex(episodeIndex);
  }, []);

  const startPlayingOne = useCallback((episode: Episode) => {
    setEpisodes([episode]);
    setCurrentEpisodeIndex(0);
  }, []);

  const resume = useCallback(() => {
    changePlayingState(true);
  }, [changePlayingState]);

  const pause = useCallback(() => {
    changePlayingState(false);
  }, [changePlayingState]);

  const playPrevious = useCallback(() => {
    setCurrentEpisodeIndex((episodeIndex) => {
      if (isShuffleActive) {
        const randomEpisodeIndex = Math.floor(Math.random() * episodes.length);
        return randomEpisodeIndex;
      }

      const isFirst = currentEpisodeIndex === 0;
      if (isFirst) {
        if (isLoopActive) return episodes.length - 1;
        return episodeIndex;
      }

      return episodeIndex - 1;
    });
  }, [isShuffleActive, currentEpisodeIndex, episodes.length, isLoopActive]);

  const playNext = useCallback(() => {
    setCurrentEpisodeIndex((episodeIndex) => {
      console.log(isShuffleActive, isLoopActive);

      if (isShuffleActive) {
        const randomEpisodeIndex = Math.floor(Math.random() * episodes.length);
        return randomEpisodeIndex;
      }

      const isLast = currentEpisodeIndex === episodes.length - 1;
      if (isLast) {
        if (isLoopActive) return 0;
        return episodeIndex;
      }

      return episodeIndex + 1;
    });
  }, [isShuffleActive, isLoopActive, currentEpisodeIndex, episodes.length]);

  const toggleLoop = useCallback(
    () => setIsLoopActive((currentLoopState) => !currentLoopState),
    [],
  );

  const toggleShuffle = useCallback(
    () => setIsShuffleActive((currentShuffleState) => !currentShuffleState),
    [],
  );

  const clear = useCallback(() => {
    setCurrentEpisodeIndex(-1);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisode,
        currentEpisodeIndex,
        isPlaying,
        hasPrevious,
        hasNext,
        isLoopActive,
        isShuffleActive,
        startPlaying,
        startPlayingOne,
        loadEpisodes,
        pause,
        resume,
        playPrevious,
        playNext,
        toggleLoop,
        toggleShuffle,
        clear,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayerContextValue {
  return useContext(PlayerContext);
}
