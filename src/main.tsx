import './index.css';
import './mocks/browser.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {enableMockServiceWorker} from './mocks/browser.ts';

enableMockServiceWorker().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>,
    );
});
