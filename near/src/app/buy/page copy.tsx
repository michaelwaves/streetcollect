"use client"

import { useContext, useEffect, useState } from "react"
import { WalletContext } from "@/context/wallet-context"
import PatentCard from "@/components/PatentCardNear"

export default function Buy() {
    const { wallet, contractId, isSignedIn } = useContext(WalletContext)!
    const [patents, setPatents] = useState([])

    useEffect(() => {
        const getNFTs = async () => {
            if (!isSignedIn) {
                console.log("not signed in!")
                return
            }
            if (!contractId) {
                console.log("missing contractID!")
                return
            }

            const result = await wallet.viewMethod({ contractId, method: "nft_tokens", args: {} })
            console.log(result)
            setPatents(result)
        }
        getNFTs();
    }
        , [wallet, contractId, isSignedIn])

    const patentComponents = patents.map((patent: any) => {
        return <PatentCard
            key={patent.owner_id}
            ownerId={patent.owner_id} tokenId={patent.token_id}
            title={patent.metadata.title} img={patent.metadata.media} abstract={patent.metadata.description} />
    })
    return (
        <div>
            <h1>Buy</h1>
            {patentComponents}
        </div>
    )
}