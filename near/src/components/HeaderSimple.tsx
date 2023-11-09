"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { WalletContext } from '@/context/wallet-context'

const signOutIcon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden block">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

const signInIcon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden block">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>



export default function Header() {

    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!
    return (
        <div className="w-full h-20 md:p-4 p-2 justify-between items-center lg:flex-row">
            <div className="h-full flex flex-row items-center justify-between p-2">
                <Link href="/" className=" flex flex-row items-center gap-4">
                <Image src={"/logo.svg"} width={60} height={60} alt="logo" className=' block'/>
                    <h2 className="text-4xl hidden md:block">TradeMint</h2>
                </Link>
                <div className=" flex-row gap-6 md:gap-10 flex">
                    <Link href="/buy" className="lg:text-4xl md:text-2xl text-lg">Buy</Link>
                    <Link href="/upload" className="lg:text-4xl md:text-2xl text-lg">Sell</Link>
                    <Link href="/profile" className="lg:text-4xl md:text-2xl text-lg">Profile</Link>
                </div>

                <div className=''>
                    {!isSignedIn ?
                        <button className="red-button bg-s-3" onClick={() => wallet.signIn()}>
                            <span className='md:block hidden'>Sign In</span>
                            {signInIcon}
                        </button> :
                        <button className="red-button " onClick={() => wallet.signOut()}>
                           <span className='md:block hidden'>Sign Out</span>
                            {signOutIcon}
                        </button>
                    }
                </div>
            </div>

        </div>
    )
}