import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/global.scss';
import { App } from './App';
import { CallListProvider } from './context/useCallList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <CallListProvider>
    <App />
   </CallListProvider>
  </React.StrictMode>,
)
