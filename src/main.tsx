import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './pages/Game';
import StateProvider from './state/state-provider';
import { ThemeStateProvider } from './theme/theme-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeStateProvider>
      <StateProvider>
        <Game />
      </StateProvider>
    </ThemeStateProvider>
  </React.StrictMode>
);
