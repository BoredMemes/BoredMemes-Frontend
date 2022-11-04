import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import App from './containers/App';
import reportWebVitals from './reportWebVitals';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-virtualized/styles.css';

import './style.scss';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root'),
);
reportWebVitals();
