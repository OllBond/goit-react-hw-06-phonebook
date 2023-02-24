import { App } from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // створюється store
  <Provider store={store}>
    {/*PersistGate  призупиняє відмалювання, дістає з localStorage 
    що треба і перезаписує store */}
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
