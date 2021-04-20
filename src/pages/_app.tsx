import { AppProps } from 'next/app';
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { Header, Player } from '~/components';
import { Container } from '~/styles/app';
import GlobalStyle from '~/styles/global';
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
