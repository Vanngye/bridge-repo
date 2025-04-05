import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi'
export const config = createConfig({
  connectors:[injected()],  
  chains: [mainnet],
	  transports: {
	    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/ZfHKI8TrcwHs7rMcYHj-YhyW7fR6EdJF"),
  },
})