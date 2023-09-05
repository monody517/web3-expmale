import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig,createConfig,configureChains } from "wagmi";
import { RainbowKitProvider,getDefaultWallets } from "@rainbow-me/rainbowkit";
import {mainnet,polygon,optimism,arbitrum,base,zora,} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import "@rainbow-me/rainbowkit/styles.css";

function App() {

  const ALCHEMY_ID = 'yiAu-cBxM2sbEV07WsI_BnarQTxJ5yB1'

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
          <ConnectButton label="我是自定义按钮文字"></ConnectButton>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
