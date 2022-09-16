import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { chain, WagmiConfig, createClient, configureChains, defaultChains } from "wagmi";
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultClient, ConnectKitProvider } from "connectkit";

const chains = [chain.goerli]
const { provider } = configureChains(defaultChains, [publicProvider()])

const client = createClient(
  getDefaultClient({
    appName: "No Pool No Game",
    autoConnect: true,
    provider,
    chains,
  }),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
