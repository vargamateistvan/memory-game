import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Game from './pages/Game';
import StateProvider from './state/state-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateProvider>
      <Game />
    </StateProvider>
  </React.StrictMode>
);
