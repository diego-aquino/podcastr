/* eslint-disable import/no-duplicates */
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Episode, EpisodeResponseItem } from '~/typings';
import { convertDurationToTimeString } from '~/utils/date';

export function convertEpisodeResponseItemToEpisode(
  episodeItem: EpisodeResponseItem,
): Episode {
  const formattedPublishDate = format(
    parseISO(episodeItem.publishedAt),
    'd MMM yy',
    { locale: ptBR },
  );
  const capitalizedFormattedPublishDate = formattedPublishDate
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');

  return {
    id: episodeItem.id,
    title: episodeItem.title,
    members: episodeItem.members,
    publishedAt: capitalizedFormattedPublishDate,
    thumbnail: episodeItem.thumbnail,
    description: episodeItem.description,
    url: episodeItem.file.url,
    durationInSeconds: episodeItem.file.duration,
    durationAsString: convertDurationToTimeString(episodeItem.file.duration),
  };
}
