import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { chain, WagmiConfig, createClient, configureChains, defaultChains } from "wagmi";
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultClient, ConnectKitProvider } from "connectkit";

const chains = [chain.goerli, chain.optimism, chain.polygonMumbai, chain.hardhat]
const { provider } = configureChains(defaultChains, [publicProvider()])
console.log(chains)
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
  <BrowserRouter>
    <React.StrictMode>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </React.StrictMode >
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
