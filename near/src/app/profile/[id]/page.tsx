"use client"

import Link from "next/link"
import { getDoc, getDocs, doc, collection } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { WalletContext } from "@/context/wallet-context"
import { db } from "@/lib/firebase"
import PatentCardProfile from "@/components/PatentCardProfile"
import PatentCardOther from "@/components/PatentCardOther"
import SocialMediaButton from "@/components/SocialMediaButton"

/* export async function generateStaticParams() {
    const profiles = await getDocs(collection(db, "profiles"))
    const paths = profiles.docs.map((profile) => {
        return {
            params: {
                id: profile.id
            }
        }
    })
    return {
        paths
    }

}
 */
export default function Page({ params }: { params: { id: string } }) {

    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!
    const [userData, setUserData] = useState<any>(null)
    const [patentsData, setPatentsData] = useState<any[]>([])

    const socialMedia = [
        "linkedin",
        "discord",
        "slack",
        "instagram",
    ]


    useEffect(() => {

        const userDocRef = doc(collection(db, "profiles"), params.id)
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

    }, [])

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

    const socialMediaButtons = socialMedia.map((platform) => {
        return <SocialMediaButton platform={platform} id={userData?.correspondence[platform]} />
    })

    return (
        <div className="w-full md:w-[clamp(400px,70vw,800px)] m-auto flex items-center flex-col justify-center gap-8">
            <h1>Profile</h1>
            {userData &&
                <>
                    <h2>{userData?.firstName} {userData?.lastName}</h2>
                    <h2 className="text-2xl">{userData?.correspondence?.email}</h2>
                    <h2 className="text-2xl">{userData?.correspondence?.phone}</h2>
                    <div className="flex flex-row w-full justify-around">
                        {socialMediaButtons}
                    </div>
                </>}
            <Link href="/profile/edit"><h2 className="text-white p-2 rounded-xl bg-s-3">Edit</h2></Link>
            <h2>Patents</h2>
            {patentsData.length > 0 &&
                patentsData.map((patent) => {
                    return (
                        wallet.accountId === patent.ownerId ?
                            <PatentCardProfile title={patent.title} description={patent.description} price={patent.price} key={patent.tokenId} /> :
                            <PatentCardOther title={patent.title} description={patent.description} price={patent.price}
                                receiverName={userData?.firstName} email={userData?.correspondence?.email} key={patent.tokenId} />
                    )
                }
                )
            }
        </div>
    )
}