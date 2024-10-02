import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Connect2ICProvider } from "@connect2ic/react";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet";
import "@connect2ic/core/style.css";
import { createClient } from "@connect2ic/core";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"

const client = createClient({
  providers: [new InternetIdentity(), new InfinityWallet(),new PlugWallet()],
  // canisters: {
  //   myCanister
  // }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
