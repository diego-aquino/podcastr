/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FC, useMemo } from 'react';

import { LogoIcon } from '~/assets';
import { Container } from '~/styles/components/Header';

const Header: FC = () => {
  const formattedDate = useMemo(
    () => format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR }),
    [],
  );

  return (
    <Container>
      <LogoIcon aria-label="Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{formattedDate}</span>
    </Container>
  );
};

export default Header;
