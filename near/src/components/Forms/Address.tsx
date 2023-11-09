import { useContext } from "react"
import { UserContext } from "@/context/profile-context"
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import { Address } from "@/types/Address";
import addSpacesBeforeCapitalLetters from "@/utils/AddSpace";
import PreviousNextButtons from "./PreviousNextButtons";



export default function Address() {

    const [profile, dispatch] = useContext(UserContext);

    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }

    const addressFields = [
        "street", "internal", "city", "state", "country", "postalCode"
    ]

    const components = addressFields.map(field => {

        const value = profile?.address[field as keyof Address]
        return (
            <input
                key={field}
                type="text" placeholder={UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(field))}
                value={typeof value === "string" ? value : ""}
                onChange={(e) => dispatch({ type: "UPDATE_ADDRESS", payload: { name: field, value: e.target.value } })} />
        )
    })

    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-fit p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-center text-p-5">
                Address
            </h2>
            {components}
            <PreviousNextButtons />
        </div>
    )
}
