import React from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { polygon } from 'wagmi/chains'
import { connectorsForWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'

// Polygon without Sponsoring
const defaultProjectId = '456c9ac7-4d25-4416-9653-81056b521978'

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [publicProvider()],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Social',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId, gasToken: 'USDC'}}),
        facebookWallet({options: { projectId: defaultProjectId, gasToken: 'USDC'}}),
        githubWallet({options: { projectId: defaultProjectId, gasToken: 'USDC' }}),
        discordWallet({options: { projectId: defaultProjectId, gasToken: 'USDC' }}),
        twitchWallet({options: { projectId: defaultProjectId, gasToken: 'USDC' }}),
        twitterWallet({options: { projectId: defaultProjectId, gasToken: 'USDC' }}),
    ],
  },
]);

const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
})

function ZeroDevWrapper({children}: {children: React.ReactNode}) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider theme={darkTheme()} chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default ZeroDevWrapper