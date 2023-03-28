import { useState } from 'react';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

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
    <div>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <WithSubnavigation />
          In the app
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  )
}

export default App
