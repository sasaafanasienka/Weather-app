import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {rootReducer} from './redux/rootReducer'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Alert from './components/Alert/Alert';

const store = createStore(rootReducer, applyMiddleware(thunk))

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 2000,
  offset: '20px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={Alert} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);