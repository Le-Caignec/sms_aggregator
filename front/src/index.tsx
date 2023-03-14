import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Web3Modal } from '@web3modal/react'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { bellecour } from './utils/wallet'
import React from 'react'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { EthereumClient, w3mProvider, w3mConnectors } from '@web3modal/ethereum'

// Wagmi Client
if (!process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_PROJECT_ID env variable')
}
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID!
const chains = [bellecour]
const { provider } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
})

// Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <ScrollToTop />
          <App />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
