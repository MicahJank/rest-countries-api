import React from 'react';

import TopBar from './components/TopBar.js';
import CardsContainer from './components/CardsContainer.js';
import styled from 'styled-components';

const AppContainer = styled.div`

`;
function App() {
  return (
    <AppContainer className="App">
      <TopBar />
      <CardsContainer />
    </AppContainer>
  );
}

export default App;
