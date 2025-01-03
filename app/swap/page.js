"use client";
import { Swap } from "@/components/Swap";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const endpoint = "https://api.devnet.solana.com";

  return (
    <div className="h-screen md:h-screen">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col justify-center items-center">
              <Swap/>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}