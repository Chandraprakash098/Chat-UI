import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import to 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

// Ensure rootElement is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create root
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
