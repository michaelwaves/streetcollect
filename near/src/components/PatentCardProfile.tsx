import { useContext, useState } from "react"
import { WalletContext } from "@/context/wallet-context"
import { FirebaseUserContext } from "@/context/firebase-context"
import { motion, LayoutGroup } from "framer-motion"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, collection, setDoc } from "firebase/firestore"
import { PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import { transferPatent } from "@/lib/near-nft"

export default function PatentCardProfile({ title, description, price, tokenId }: { [props: string]: any }) {
    const { userData } = useContext(FirebaseUserContext)!
    const [receiverData, setReceiverData] = useState({} as any)
    const ownerId = userData?.nearId
    const [receiverId, setReceiverId] = useState("")
    const [inputOpen, setInputOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const inputVariants = {
        open: {
            opacity: 1,
            width: "75%",
            transition: {
                duration: 0.3
            }
        },
        closed: {
            opacity: 0,
            width: 0,
            transition: {
                duration: 0.3
            }
        }
    }
    const buttonVariants = {
        open: {
            opacity: 1,
            width: "25%",
            transition: {
                duration: 0.3
            }
        },
        closed: {
            opacity: 0,
            width: 0,
            transition: {
                duration: 0.3
            }
        }
    }
    const changePatentOwner = async (ownerId: string, tokenId: string, receiverId: string) => {
        const docRef = doc(db, "patents", tokenId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            const owner = data?.ownerId
            if (owner === ownerId) {
                await updateDoc(docRef, {
                    ownerId: receiverId
                })
            } else {
                console.log("ownerId does not match!")
            }
        } else {
            console.log("patent does not exist!")
        }
    }
    const getReceiverData = async (receiverId: string) => {
        const docRef = doc(db, "profiles", receiverId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            setReceiverData(data)
            return data
        } else {
            console.log("receiver profile does not exist!")
        }
    }

    const getPatentData = async (tokenId: string) => {
        const docRef = doc(db, "patents", tokenId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            return data
        } else {
            console.log("patent does not exist!")
        }
    }

    const createNewTransaction = async (ownerId: string, tokenId: string, receiverId: string) => {
        const receiverData = await getReceiverData(receiverId)
        const patentData = await getPatentData(tokenId)
        const id = `${tokenId}-${receiverId}-${ownerId}`
        const transactionRef = doc(collection(db, "transactions"), id)
        const properties = Object.entries(patentData?.properties).map(([key, value]) => {
            return {
                [key]: value
            }
        }
        )
        const epasTransactionData = {
            "pat-assignment-template": {
                "correspondent": {
                    "correspondent-name-address": {
                        "name": userData?.correspondence.name ?? "name",
                        "address-1": userData?.correspondence.address,
                        "address-2": userData?.address.internal,
                        "city": userData?.address.city,
                        "state": userData?.address.state,
                        "postal-code": userData?.address.postalCode
                    },
                    "e-mail": userData?.correspondence.email,
                    "fax": userData?.correspondence.fax,
                    "phone": userData?.correspondence.phone
                },
                "pat-conveying-parties": {
                    "pat-conveying-party": [
                        {
                            "individual": {
                                "prefix": userData?.prefix,
                                "first-name": userData?.firstName,
                                "middle-name": userData?.middleName,
                                "last-name": userData?.lastName,
                                "suffix": userData?.suffix
                            },

                        },
                        {
                            "company": {
                                "orgname": userData?.companyName
                            },

                        }
                    ]
                },
                "pat-receiving-parties": {
                    "pat-receiving-party": [
                        {
                            "individual": {
                                "prefix": receiverData?.prefix,
                                "first-name": receiverData?.firstName,
                                "middle-name": receiverData?.middleName,
                                "last-name": receiverData?.lastName,
                                "suffix": receiverData?.suffix
                            },
                            "address": {
                                "address-1": receiverData?.correspondence.address,
                                "city": receiverData?.address.city,
                                "state": receiverData?.address.state,
                                "postal-code": receiverData?.address.postalCode
                            }
                        },
                        {
                            "company": {
                                "orgname": receiverData?.companyName
                            },
                            "address": {
                                "address-1": receiverData?.correspondence.address,
                                "city": receiverData?.address.city,
                                "state": receiverData?.address.state,
                                "postal-code": receiverData?.address.postalCode
                            }
                        }
                    ]
                },
                "pat-properties": {
                    "pat-property": properties
                }
            }
        }

        await setDoc(transactionRef, epasTransactionData)
    }
    //patents are in array "patents" in each profile, transfer the tokenId from owner array to receiver array
    const handlePatentTransferFirestore = async (ownerId: string, tokenId: string, receiverId: string) => {
        const docRef = doc(db, "profiles", ownerId)
        const docSnap = await getDoc(docRef)
        setLoading(true)
        if (docSnap.exists()) {
            const data = docSnap.data()
            const patents = data?.patents
            let newOwnerPatents = patents.filter((patent: any) => patent !== tokenId)

            const newDocRef = doc(db, "profiles", receiverId)
            const newDocSnap = await getDoc(newDocRef)

            if (newDocSnap.exists()) {
                const newData = newDocSnap.data()
                let oldPatents = newData?.patents
                let newPatents = [...oldPatents, tokenId]
                console.log(newPatents)
                await changePatentOwner(ownerId, tokenId, receiverId)
                await updateDoc(docRef, {
                    patents: newOwnerPatents
                })
                await updateDoc(newDocRef, {
                    patents: newPatents
                })
                await createNewTransaction(ownerId, tokenId, receiverId)
                //transfer patent on NEAR
                await transferPatent(wallet, tokenId, receiverId)

                //router.push(`/profile/${receiverId}`)
            } else {
                console.log("receiver profile does not exist!")
                //router.push(`/profile/fail`)
            }
        }
        setLoading(false)
    }


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
                <LayoutGroup>
                    <motion.input
                        className="text-lg"
                        layout
                        variants={inputVariants}
                        initial="closed"
                        animate={inputOpen ? "open" : "closed"}
                        type="text" placeholder="Input Receiver Id" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />

                    <motion.button
                        className="text-lg md:text-2xl"
                        whileHover={{ scale: 1.1 }}
                        variants={buttonVariants}
                        initial="closed"
                        animate={inputOpen ? "open" : "closed"}
                        onClick={async () => {
                            handlePatentTransferFirestore(ownerId, tokenId, receiverId)
                        }}>Confirm</motion.button>
                    <motion.button
                        className={`text-lg md:text-2xl ${inputOpen ? "bg-red-500" : "bg-s-3"}`}
                        onClick={() => setInputOpen(!inputOpen)}>{inputOpen ? "Close" : "Send"}</motion.button>
                </LayoutGroup>
                {loading && <div className="absolute top-0 left-0 w-screen h-screen bg-p-5 bg-opacity-50 flex items-center justify-center"><PulseLoader color={"#ffffff"} loading={loading} size={15} /></div>}
            </div>
        </div >

    )
}