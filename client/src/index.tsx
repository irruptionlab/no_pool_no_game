import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { chain, WagmiConfig, createClient, configureChains } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains([chain.optimism, chain.polygonMumbai, chain.goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),

  ],
  provider,
  webSocketProvider,
})

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
