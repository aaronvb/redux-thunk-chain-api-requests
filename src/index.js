import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <div>
      <App store={store} />
    </div>
  </Provider>,
  target,
);

registerServiceWorker();
