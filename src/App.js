import React from 'react';

import TopBar from './components/TopBar.js';
import Routing from './utils/Routing.js';
import CardsContainer from './components/CardsContainer.js';
import styled from 'styled-components';

const AppContainer = styled.div`

`;
function App() {
  return (
    <AppContainer className="App">
      <TopBar />
      <Routing />
    </AppContainer>
  );
}

export default App;
