"use client"

import { useContext, useEffect, useState } from "react"
import { WalletContext } from "@/context/wallet-context"
import PatentCardNear from "@/components/PatentCardNear"
import { getDocs, doc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"
import PatentCardBrowse from "@/components/PatentCardBrowse"

export default function Buy() {
    const { wallet, contractId, isSignedIn } = useContext(WalletContext)!
    const [patents, setPatents] = useState<any>([])
    const [firebasePatents, setFirebasePatents] = useState<any>([])
    const patentsRef = collection(db, "patents")
    const profileRef = collection(db, "profiles")


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
        const getPatents = async () => {
            const querySnapshot = await getDocs(patentsRef);
            const patents = querySnapshot.docs.map((doc) => doc.data());
            setFirebasePatents(patents)
        }
        getPatents();
    }
        , [wallet, contractId, isSignedIn])

    const patentComponents = patents.map((patent: any) => {
        return <PatentCardNear
            ownerId={patent.owner_id} tokenId={patent.token_id}
            title={patent.metadata.title} img={patent.metadata.media} abstract={patent.metadata.description} />
    })

    const firebasePatentComponents = firebasePatents.map((patent: any) => {
        return <PatentCardBrowse
        key={patent.tokenId}
            title={patent.title} description={patent.description} price={patent.price} ownerId={patent.ownerId} />
    })

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <h1>Buy</h1>
            {firebasePatentComponents}
        </div>
    )
}