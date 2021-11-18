import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from 'Router';
import { createGlobalStyle } from 'styled-components';

import palette from 'theme/palette';

import { AlertModal } from 'components/common';

const GlobalStyle = createGlobalStyle`
  * {
    font-weight: bold;
    font-family: 'Spoqa Han Sans Neo';
    ::placeholder,
    ::-webkit-input-placeholder {
      font-weight: bold;
      font-family: 'Spoqa Han Sans Neo';
      color: ${palette.darkgray};
    }
    :-ms-input-placeholder {
      font-weight: bold;
      font-family: 'Spoqa Han Sans Neo';
      color: ${palette.darkgray};
    }
  }

  body {
    margin: 0;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AlertModal />
      <Router />
    </RecoilRoot>
  );
}
export default App;
