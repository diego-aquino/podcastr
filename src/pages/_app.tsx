import { AppProps } from 'next/app';
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { Header, Player } from '~/components';
import GlobalStyle from '~/styles/global';
import { Container } from '~/styles/pages/app';
import theme from '~/styles/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />

    <Container>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </Container>
  </ThemeProvider>
);

export default App;
