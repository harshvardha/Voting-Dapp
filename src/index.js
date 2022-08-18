import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VotingProvider } from './context/VotingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VotingProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </VotingProvider>
);
