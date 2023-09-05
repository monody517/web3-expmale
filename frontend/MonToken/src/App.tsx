import { WagmiConfig,createConfig,configureChains } from "wagmi";
import { RainbowKitProvider,getDefaultWallets } from "@rainbow-me/rainbowkit";
import {mainnet,polygon,optimism,arbitrum,base,zora,} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Home from './pages/home'

function App() {

  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [publicProvider()],
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
