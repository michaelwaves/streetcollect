import { useContext, useState, useEffect } from "react"
import { WalletContext } from "@/context/wallet-context"
import { FirebaseUserContext } from "@/context/firebase-context";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";

export default function PatentCardBrowse({ title, description, price, ownerId }: { [props: string]: any }) {
    const { userData } = useContext(FirebaseUserContext)!
    const [ownerData, setOwnerData] = useState<any>(null)
    const ownerRef = doc(db, "profiles", ownerId)
    useEffect(() => {
        const getOwnerData = async () => {
            const data = await getDoc(ownerRef)
            if (data.exists()) {
                setOwnerData(data.data())
            } else {
                console.log("no such user")
            }
        }
        getOwnerData()
    }, [])

    const subject = `Let's Chat about your Trademint Portfolio: ${title}`;
    const body = `Hi ${ownerData?.firstName},\n\nI'm interested in ${title}.\n\nLet's chat!\n\n${userData?.firstName}`;
    const recipient = ownerData?.correspondence.email;
    const handleEmailClick = () => {
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };
    const router = useRouter();
    const handleProfileClick = () => {
        router.push(`/profile/${ownerId}`)
    };

    const { wallet } = useContext(WalletContext)!

    return (
        <div className="w-full md:w-[clamp(400px,70vw,800px)] bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                </h3>
                <h2 className="mt-1 max-w-2xl text-sm text-s-3">
                    {price}
                </h2>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex justify-between">
                        <dt className="text-sm font-medium">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {description}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 flex justify-between">
                <button
                    className="text-lg md:text-xl text-s-3 bg-white"
                    onClick={() => handleProfileClick()}>Posted by: {ownerId}</button>
                <button
                    className="text-lg md:text-2xl bg-s-3"
                    onClick={() => handleEmailClick()}>Contact</button>

            </div>
        </div >

    )
}