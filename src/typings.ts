export interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  url: string;
  durationInSeconds: number;
  durationAsString: string;
}

export interface EpisodeResponseItem {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  file: { url: string; type: string; duration: number };
}
