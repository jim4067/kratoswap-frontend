import { useState } from 'react';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import {
	BrowserRouter as Router,
	// Switch,
	Routes,
	Route,
	Link
} from "react-router-dom";

import CollectionPage from './pages/CollectionPage';
import AboutPage from './pages/AboutPage';
import MyPools from './pages/MyPools';
import MyNfts from './pages/MyNfts';
import Home from './pages/Home';

import WithSubnavigation from './components/NavBar';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


const alchemyId = "process.env.ALCHEMY_ID";

const client = createClient(
	getDefaultClient({
		appName: "Your App Name",
		alchemyId,
	}),
);


function App() {

	return (
		<Router>
			<div>
				<WagmiConfig client={client}>
					<ConnectKitProvider>
						<WithSubnavigation />
						<div style={{margin: "0 23px"}}>
							<Routes>
								<Route path='collections' Component={CollectionPage} />
								<Route path='about' Component={AboutPage} />
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
