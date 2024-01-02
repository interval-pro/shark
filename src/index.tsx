import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import { App, AppProvider } from './App';

const rootEl = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEl);

const AppWrapper = (
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

root.render(AppWrapper);
