import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { bellecour } from './utils/wallet'
import React from 'react'
import { store } from './utils/store'
import { Provider } from 'react-redux'

// Wagmi Client
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const clientWagmi = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

// Apollo Client
const clientApollo = new ApolloClient({
  uri: 'http://127.0.0.1:8000/subgraphs/name/SMS_Aggregator',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={clientApollo}>
          <WagmiConfig client={clientWagmi}>
            <ScrollToTop />
            <App />
          </WagmiConfig>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
)
