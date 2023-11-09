import { useContext, useState } from "react"
import { PatentContext } from "@/context/upload-context"
import { WalletContext } from "@/context/wallet-context";
import { setDoc, collection, doc, addDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import { removePropertiesFromArray } from "@/utils/RemovePropertiesFromArray";
import { PatentProperties } from "@/types/Patent";
import addSpacesBeforeCapitalLetters from "@/utils/AddSpace";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { mintPatent } from "@/lib/near-nft";
import { approveNFTForSale } from "@/lib/near-marketplace";


export default function Review() {
    const patentRef = collection(db, "patents");
    const [profile, dispatch] = useContext(PatentContext);
    const { wallet } = useContext(WalletContext)!;
    const [loading, setLoading] = useState(false);
    const ownerRef = doc(collection(db, "profiles"), profile?.ownerId == "" ? "myu2.testnet" : profile?.ownerId);
    const router = useRouter();

    //once we setup near minting, we will need to change this to tokenId returned from mint function
    /*  const handlePatentUploadFirestore = async () => {
         if (profile && profile.tokenId) {
             const filteredProfile = removePropertiesFromArray(["index"], profile);
             await setDoc(doc(storageRef, profile.tokenId), filteredProfile);
         }
     } */
    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }
    const handlePatentUploadFirestore = async () => {
        setLoading(true);
        try {
            if (profile) {
                const filteredPatent = removePropertiesFromArray(["index"], profile);
                const patent = await addDoc(patentRef, filteredPatent);
                dispatch({ type: "SET_TOKEN_ID", payload: { name: "", value: patent.id } });
                await addPatentToOwner(patent.id);

                //update tokenId field in firestore
                await updateDoc(doc(patentRef, patent.id), {
                    tokenId: patent.id
                })
                const nftMetadata = {
                    title: profile.title,
                    description: profile.description,
                    price: profile.price,
                    properties: profile.properties,
                    attachmentLinks: profile.attachmentLinks,
                    attorneyDocketNumber: profile.attorneyDocketNumber,
                }
                await mintPatent(wallet, patent.id, nftMetadata);
                //await approveNFTForSale(wallet, patent.id, profile.price); this doesn't actually work due to redirect to wallet signin from mintPatent
                setLoading(false);
                //router.push(`/upload/success`)
            }
        }
        catch (error) {
            console.log(error)
            setLoading(false);
            //router.push(`/upload/fail`)
        }
    }


    const addPatentToOwner = async (patentId: string) => {
        if (profile && profile.ownerId) {
            await updateDoc(ownerRef, {
                patents: arrayUnion(patentId)
            })
        }
    }
    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:hidden block">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    const numberTypes = [
        "applicationNumber", "patentNumber", "pctNumber", "internationalRegistrationNumber"
    ]

    const displayComponents = numberTypes.map((number, index) => {
        const title = UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(number))

        const numbers = profile?.properties[number as keyof PatentProperties] as string[]
        return (
            <div key={number}>
                <h2 className="text-p-5 text-2xl">{title}s Added</h2>
                {numbers?.map((number, index) => {
                    return (
                        <div
                            key={number + index.toString()}
                            className="flex flex-row w-full justify-between items-center">
                            <p key={index}>{number}</p>
                            <button onClick={() => dispatch({ type: "SEARCH_PROPERTIES_AND_REMOVE", payload: { name: numberTypes[index], value: number } })}
                            ><h3 className="hidden md:block">Remove</h3>
                                {deleteIcon}
                            </button>
                        </div>
                    )
                })}

            </div>

        )
    }
    )
    return (
        <div className="relative md:w-[clamp(500px,50vw,800px)] text-white w-full h-auto p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-p-5">Review Posting</h2>
            <div>
                <h2>Details</h2>
                <div>
                    <h2 className="text-2xl text-p-5">Title</h2>
                    <p>{profile?.title}</p>
                </div>
                <div>
                    <h2 className="text-2xl text-p-5">Description</h2>
                    <p>{profile?.description}</p>
                </div>
            </div>
            <div>
                <h2>Numbers Added</h2>
                <div className="flex flex-col w-full ">
                    {displayComponents}
                </div>
            </div>
            <div>
                <h2 className="">Price</h2>
                <p className="text-2xl">{profile?.price}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
                <button className="text-4xl animated-underline"
                    onClick={() => dispatch({ type: "DECREMENT_INDEX", payload: { name: "", value: "" } })}
                >Previous</button>
                <button className="text-4xl animated-underline"
                    onClick={() => handlePatentUploadFirestore()}
                >Upload</button>
            </div>
            {loading && <div className="absolute top-0 left-0 w-full h-full bg-p-5 bg-opacity-50 flex items-center justify-center"><PulseLoader color={"#ffffff"} loading={loading} size={15} /></div>}
        </div>
    )
}
