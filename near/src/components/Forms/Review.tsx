import { useContext, useState } from "react"
import { UserContext } from "@/context/profile-context"
import { setDoc, collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import { removePropertiesFromArray } from "@/utils/RemovePropertiesFromArray";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function Review() {
    const storageRef = collection(db, "profiles");
    const [profile, dispatch] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleProfileUploadFirestore = async () => {
        setLoading(true);
        if (profile && profile.nearId) {
            try {
                const filteredProfile = removePropertiesFromArray(["index"], profile);
                await setDoc(doc(storageRef, profile.nearId), filteredProfile);
                setLoading(false);
                router.push(`/profile/success`)
            } catch (error) {
                console.log(error)
                setLoading(false);
                router.push(`/profile/fail`)
            }

        }
    }

    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }
    return (
        <div className="md:w-[clamp(500px,50vw,800px)] text-white w-full h-auto p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h1 className="text-p-5">Review your answers!</h1>
            <h2>Your Choices</h2>
            <div className="flex flex-col w-full justify-around">
                <p>{profile?.type ? UpperCaseFirstLetter(profile?.type) : ""} Profile</p>
                <p>{profile?.address.us ? "US Company" : "Non US Company"}</p>
            </div>
            <h2>Address</h2>
            <div className="flex flex-col w-full justify-around">
                <p>Street: {profile?.address.street}</p>
                <p>Internal: {profile?.address.internal}</p>
                <p>City: {profile?.address.city}</p>
                <p>State: {profile?.address.state}</p>
                <p>Country: {profile?.address.country}</p>
                <p>Postal Code: {profile?.address.postalCode}</p>
            </div>
            <h2>Correspondence</h2>
            <div className="flex flex-col w-full justify-around">
                <p>Name: {profile?.correspondence.name}</p>
                <p>Email: {profile?.correspondence.email}</p>
                <p>Phone: {profile?.correspondence.phone}</p>
                <p>Fax: {profile?.correspondence.fax}</p>
                <p>Discord: {profile?.correspondence.discord}</p>
                <p>Slack: {profile?.correspondence.slack}</p>
                <p>Instagram: {profile?.correspondence.instagram}</p>
            </div>
            {profile?.type === "individual" &&
                <div>
                    <h2>About You!</h2>
                    <p>Because sometimes it really is all about you 💖</p>
                    <div className="flex flex-col w-full justify-around">
                        <p>First Name: {profile?.firstName}</p>
                        <p>Middle Name: {profile?.middleName}</p>
                        <p>Last Name: {profile?.lastName}</p>
                        <p>Suffix: {profile?.suffix}</p>
                        <p>Prefix: {profile?.prefix}</p>
                    </div>
                </div>
            }
            {profile?.type === "company" &&
                <div>
                    <h2>Your Epic Company!</h2>
                    <p>{profile?.companyName}</p>
                </div>
            }

            <div className="flex flex-row justify-between w-full">
                <button className="text-4xl animated-underline"
                    onClick={() => dispatch({ type: "DECREMENT_INDEX", payload: { name: "", value: "" } })}
                >Previous</button>
                <button className="text-4xl animated-underline"
                    onClick={() => handleProfileUploadFirestore()}
                >Upload!</button>
            </div>
            {loading && <div className="absolute top-0 left-0 w-full h-full bg-p-5 bg-opacity-50 flex items-center justify-center"><PulseLoader color={"#ffffff"} loading={loading} size={15} /></div>}
        </div>
    )
}