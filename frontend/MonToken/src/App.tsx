import { WagmiConfig,createConfig,configureChains } from "wagmi";
import { RainbowKitProvider,getDefaultWallets } from "@rainbow-me/rainbowkit";
import {mainnet,polygon,goerli} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import Home from './pages/home'

function App() {

  const { chains, publicClient } = configureChains(
    [mainnet, polygon,goerli],
    [alchemyProvider({ apiKey: 'yiAu-cBxM2sbEV07WsI_BnarQTxJ5yB1' })],
  )
  
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

  const config = createConfig({
    publicClient,
    connectors,
    autoConnect: true,
  })

  return (
    <>
      
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <Home />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
