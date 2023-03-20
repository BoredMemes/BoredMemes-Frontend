import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import App from './containers/App';
import reportWebVitals from './reportWebVitals';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-virtualized/styles.css';

import './style.scss';
import { AuthProvider } from "context/authContext";
import { RefreshContextProvider } from "context/RefreshContext";
import { Web3ReactManager } from "hooks/Web3ReactManager";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <AuthProvider>
          <RefreshContextProvider>
            <ToastContainer position="top-left" />
            <App />
          </RefreshContextProvider>
        </AuthProvider>
      </Web3ReactManager>
    </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
