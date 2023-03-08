import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Web3Modal } from '@web3modal/react'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { bellecour } from './utils/wallet'
import React from 'react'
import { store } from './app/store'
import { Provider } from 'react-redux'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum'

// Wagmi Client
if (!process.env.REACT_APP_ALCHAMY_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_PROJECT_ID env variable')
}
const projectId = process.env.REACT_APP_ALCHAMY_PROJECT_ID!
const chains = [bellecour]
const { provider } = configureChains(
  [bellecour],
  [walletConnectProvider({ projectId })],
)

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: '1',
    appName: 'SMS Aggregator',
    chains,
    projectId,
  }),
  provider,
})

// Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// Apollo Client
const apolloClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/subgraphs/name/SMS_Aggregator',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <WagmiConfig client={wagmiClient}>
            <ScrollToTop />
            <App />
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
