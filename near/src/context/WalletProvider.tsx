"use client"

import { Wallet } from "@/lib/near-wallet"
import { WalletContext, WalletContextType } from '@/context/wallet-context'
import { useState, useEffect } from 'react'

const NFT_CONTRACT_ID = "nft-tutorial-js.myu2.testnet"
const MAIN_ACCOUNT = "myu2.testnet"


export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallet = new Wallet({ createAccessKeyFor: NFT_CONTRACT_ID });

  const [walletContext, setWalletContext] = useState<WalletContextType>({
    isSignedIn: false,
    contractId: NFT_CONTRACT_ID,
    wallet: wallet,
  })
  useEffect(() => {
    const setup = async () => {


      const signedIn = await wallet.startUp()


      setWalletContext({
        isSignedIn: signedIn,
        contractId: NFT_CONTRACT_ID,
        wallet: wallet,
      })
    }
    setup()
  }, [])

  return (
    <WalletContext.Provider value={walletContext}>
      {children}
    </WalletContext.Provider>
  );
}