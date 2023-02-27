import { Container, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import { configuration } from './configuration/config/configLoader';
import { globalMuiTheme } from './configuration/theme/muiGlobalTheme';
import { uiGlobalTheme } from './configuration/theme/uiGlobalTheme';
import logo from './logo.svg';
import { Entry } from './page/entry';
import { Input } from './page/input';
import { Result } from './page/result';

function App() {
  // CONFIGURATION DEMO FOR REFERENCE
  console.debug(configuration);

  return (
    <ThemeProvider theme={globalMuiTheme}>
      <Container {...uiGlobalTheme.root.container}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path={'/Entry'} element={<Entry pageTheme={uiGlobalTheme} />} />
            <Route path={'/Input'} element={<Input pageTheme={uiGlobalTheme} />} />
            <Route path={'/Result'} element={<Result pageTheme={uiGlobalTheme} />} />
            <Route path='/*' element={<Navigate to='/Entry' />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
