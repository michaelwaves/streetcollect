"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { WalletContext } from '@/context/wallet-context'
import ChangingText from '@/components/FramerMotion/ChangingText'
import { Testtube } from '@/components/ReactThreeFiber/Testtube'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

/* import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet"; */



export default function Home() {
  /* useEffect(() => {
    const setup = async () => {
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupNearWallet()],
    });
    
    const modal = setupModal(selector, {
      contractId: "test.testnet",
    });
    
    modal.show();}

    setup()
   
  }, []); */
  const { wallet, contractId, isSignedIn } = useContext(WalletContext)!

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col'>
        <Image src={"/logo.svg"} width={100} height={100} alt="logo" className='mx-auto block' />
        <h1 className="text-5xl mt-12 text-center">The Cool Patent Marketplace</h1>
        <ChangingText texts={["Get Paid for Your Research", "Find Your Perfect Patent"]} delay={3} />
      </div>
      <div className='flex flex-col md:flex-row w-full justify-center'>
        <div className="w-full md:w-1/2 h-auto justify-center">
          <div className="flex gap-12 mt-12 flex-col w-full justify-center items-center">
            <Link href="/buy" className="nav-element "><h1>Buy</h1></Link>
            <Link href="/upload" className="nav-element "><h1>Sell</h1></Link>
            <Link href="/profile" className="nav-element "><h1>Profile</h1></Link>
            {!isSignedIn ?
              <button onClick={() => wallet.signIn()}>SignIn</button> :
              <button onClick={() => wallet.signOut()}>SignOut</button>}

          </div>
        </div>
        <div className='w-full md:block hidden h-screen md:w-1/2'>
          <Canvas>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={1} makeDefault />
            <Testtube />
          </Canvas>
        </div>
      </div>
    </main>
  )
}
