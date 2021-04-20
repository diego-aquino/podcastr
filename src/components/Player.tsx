import React, { FC } from 'react';

import {
  PlayNextIcon,
  PlayPreviousIcon,
  PlayIcon,
  PlayingIcon,
  RepeatIcon,
  ShuffleIcon,
} from '~/assets';
import {
  ActionButtons,
  Container,
  FeaturedPodcast,
  Footer,
  PlayButton,
  Progress,
  Slider,
} from '~/styles/components/Player';

const Player: FC = () => (
  <Container>
    <header>
      <PlayingIcon aria-label="Tocando agora" />
      <span>Tocando agora</span>
    </header>

    <FeaturedPodcast mode="inactive">
      <span>Selecione um podcast para ouvir</span>
    </FeaturedPodcast>

    <Footer mode="inactive">
      <Progress>
        <span>00:00</span>
        <Slider />
        <span>00:00</span>
      </Progress>
      <ActionButtons>
        <button type="button">
          <ShuffleIcon aria-label="Embaralhar" />
        </button>
        <button type="button">
          <PlayPreviousIcon aria-label="Tocar anterior" />
        </button>
        <PlayButton type="button">
          <PlayIcon aria-label="Tocar" />
        </PlayButton>
        <button type="button">
          <PlayNextIcon aria-label="Tocar próximo" />
        </button>
        <button type="button">
          <RepeatIcon aria-label="Repetir" />
        </button>
      </ActionButtons>
    </Footer>
  </Container>
);

export default Player;
