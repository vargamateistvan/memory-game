import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Game from './pages/Game';
import { ThemeStateProvider } from './theme/theme-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeStateProvider>
      <Game />
    </ThemeStateProvider>
  </React.StrictMode>
);
