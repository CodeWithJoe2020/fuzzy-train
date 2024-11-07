import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider,darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  Chain,
  sepolia,
  mainnet,
  base
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/Navbar';
import TopNotificationBar from "../components/Topnotification";
import { Analytics } from "@vercel/analytics/react"

// Define WorldChain with correct RPC URL structure
const worldchain = {
  id: 480,
  name: 'WorldChain',
  network: 'worldchain',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/13502.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'ETH', symbol: 'WLD', decimals: 18 },
  rpcUrls: {
    public: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public']
    },
    default: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public']
    }
  },
  blockExplorers: {
    default: { name: 'WorldChain Explorer', url: 'https://worldchain-mainnet.explorer.alchemy.com/' },
  }
} as const satisfies Chain;

// Configure chains including WorldChain
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    sepolia,
    worldchain,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets(
  
  {
  appName: 'CodeWithJoe',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Analytics/>
        <TopNotificationBar/>
        <Navbar/>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;