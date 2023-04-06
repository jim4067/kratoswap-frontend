import { useState } from 'react';
import { WagmiConfig, createClient, configureChains, mainnet,goerli } from "wagmi";
import { polygonMumbai } from '@wagmi/chains';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import {
	BrowserRouter as Router,
	// Switch,
	Routes,
	Route,
	Link
} from "react-router-dom";

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import ViewCollection from './pages/ViewCollection';
import CollectionPage from './pages/CollectionPage';
import AboutPage from './pages/AboutPage';
import MyPools from './pages/MyPools';
import MyNfts from './pages/MyNfts';
import Home from './pages/Home';

import WithSubnavigation from './components/NavBar';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


const alchemyId = "8WXlxcCMDdIXaFl7bHxv-QuHej88F291";

const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: alchemyId }), publicProvider()],
)

const client = createClient(
	getDefaultClient({
		appName: "Your App Name",
		alchemyId,
		chains
	}),
);

// const client = createClient({
// 	autoConnect: true,
// 	connectors: [
// 		new MetaMaskConnector({ chains }),
// 	],
// 	provider,
// 	webSocketProvider,
// })


function App() {

	return (
		<Router>
			<div>
				<WagmiConfig client={client}>
					<ConnectKitProvider>
						<WithSubnavigation />
						<div style={{ margin: "0 23px" }}>
							<Routes>
								<Route path='/collections' Component={CollectionPage} />
								<Route path='/collection/:collectionAddress' Component={ViewCollection} />
								<Route path='/about' Component={AboutPage} />
								<Route path='/my-nfts' Component={MyNfts} />
								<Route path='/my-pools' Component={MyPools} />
								<Route path='/' Component={Home} />
							</Routes>
						</div>
					</ConnectKitProvider>
				</WagmiConfig>
			</div>
		</Router>
	)
}

export default App
