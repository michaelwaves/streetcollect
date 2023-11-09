import { useContext, useState } from "react"
import { WalletContext } from "@/context/wallet-context"

export default function PatentCardNear({ ownerId, tokenId, title, img, abstract, assignee, inventors, dateIssued, }: { [props: string]: string }) {
    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!
    const [receiverId, setReceiverId] = useState("")

    const buy = async () => {
        if (!isSignedIn) {
            console.log("not signed in!")
            return
        }
        if (!contractId) {
            console.log("missing contractID!")
            return
        }
        const result = await wallet.callMethod({
            contractId,
            method: "nft_transfer",
            args: {
                token_id: tokenId,
                receiver_id: receiverId,
                memo: "test",
            },
            gas: "300000000000000",
            deposit: "1",
        })
        console.log(result)
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>Owner:{ownerId}</p>
            <img src={img} alt="" />
            <p>{abstract}</p>

            {wallet.accountId === ownerId &&
                <div>
                    <input type="text" placeholder="Input Receiver Id" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
                    <button onClick={buy}>Send NFT</button>
                </div>}
        </div>
    )
}