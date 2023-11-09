"use client"

import Link from "next/link"
import { getDoc, doc, collection, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { WalletContext } from "@/context/wallet-context"
import { db } from "@/lib/firebase"
import PatentCardProfile from "@/components/PatentCardProfile"
import SocialMediaButton from "@/components/SocialMediaButton"
import DownloadButton from "@/components/DownloadXML"

export default function Page() {

    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!
    const [userData, setUserData] = useState<any>(null)
    const [patentsData, setPatentsData] = useState<any[]>([])
    const [transactionsData, setTransactionsData] = useState<any[]>([])

    const getTransactionsWithUserId = async (userId: string) => {
        const transactionRef = collection(db, "transactions")
        const data = await (getDocs(transactionRef))
        let transactionsArray: any[] = []
        /* const transactions = data.docs.map((doc) => {
            if (doc.id.includes(userId)) {
                transactionsArray.push({ id: doc.id, ...doc.data() })
            }
            return doc.data()
        }) */
        const transactions = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        //setTransactionsData(transactionsArray)
        setTransactionsData(transactions)
    }

    const socialMedia = [
        "linkedin",
        "discord",
        "slack",
        "instagram",
    ]


    useEffect(() => {
        if (isSignedIn) {
            const userDocRef = doc(collection(db, "profiles"), wallet.accountId)
            getDoc(userDocRef).then((doc) => {
                if (doc.exists()) {
                    console.log("Document data:", doc.data());
                    setUserData(doc.data())
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [isSignedIn])

    useEffect(() => {

        const getPatents = async () => {
            if (userData && userData.patents && isSignedIn) {
                for (var patent of userData.patents as string[]) {
                    const patentDocRef = doc(collection(db, "patents"), patent)
                    console.log(patent)
                    try {
                        const data = ((await getDoc(patentDocRef)).data())
                        setPatentsData((prevPatentsData) => [...prevPatentsData, data])
                    } catch (error) {
                        console.log("Error getting document:", error);
                    }
                    ;
                    console.log(patentsData)
                }
            }
        }
        getPatents()
    }, [userData])

    useEffect(() => {
        if (isSignedIn) {
            getTransactionsWithUserId(wallet.accountId)
            console.log(transactionsData)
        }
    }, [isSignedIn, userData])

    const socialMediaButtons = socialMedia.map((platform) => {
        return <SocialMediaButton platform={platform} id={userData?.correspondence[platform]} />
    })


    return (
        <div className="w-full md:w-[clamp(400px,70vw,800px)] m-auto flex items-center flex-col justify-center gap-8">
            {isSignedIn ? <h1>Profile</h1> : <h1>Sign In to View Profile</h1>}
            {userData &&
                <>
                    <h2>{userData?.firstName} {userData?.lastName}</h2>
                    <h2 className="text-2xl">{userData?.correspondence?.email}</h2>
                    <h2 className="text-2xl">{userData?.correspondence?.phone}</h2>
                    <div className="flex flex-row w-full justify-around">
                        {socialMediaButtons}
                    </div>
                </>}
            {isSignedIn ?
                <Link href="/profile/edit"><h2 className="text-white p-2 rounded-xl bg-s-3">Edit</h2></Link> :
                <button className="text-4xl animated-underline" onClick={() => wallet.signIn()}>Sign In</button>
            }
            <h2>Patents</h2>
            {patentsData.length > 0 &&
                patentsData.map((patent) => {
                    return <PatentCardProfile title={patent.title} description={patent.description} price={patent.price} tokenId={patent.tokenId} key={patent.tokenId} />
                }
                )
            }
            <h2>Transactions</h2>
            {transactionsData.length > 0 &&
                transactionsData.map((transaction) => {
                    const { id, ...rest } = transaction
                    return <div className="flex flex-row justify-between w-full bg-white p-4 rounded-xl">
                        <div>
                            <h3><b>Token Id:</b>{id}</h3>
                            <h3><b>From:</b>{transaction["pat-assignment-template"]["pat-conveying-parties"] ? transaction["pat-assignment-template"]["pat-conveying-parties"]["pat-conveying-party"][0].individual["first-name"] : ""}</h3>
                            <h3><b>To:</b>{transaction["pat-assignment-template"]["pat-receiving-parties"] ? transaction["pat-assignment-template"]["pat-receiving-parties"]["pat-receiving-party"][0].individual["first-name"] : ""}</h3>
                        </div>
                        <DownloadButton jsonData={rest["pat-assignment-template"]} />
                    </div>
                })

            }
        </div>
    )
}