import { useContext } from "react"
import { UserContext } from "@/context/profile-context"
import { ExtendedCorrespondence } from "@/types/Epas";
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import PreviousNextButtons from "./PreviousNextButtons";


export default function Business() {

    const [profile, dispatch] = useContext(UserContext);

    const correspondenceFields = [
        "name", "email", "phone", "fax"
    ]

    const components = correspondenceFields.map(field => {
        if (dispatch === undefined) {
            return <div key={field}>Dispatch Function is Not Defined!</div>
        }
        return (
            <input
                key={field}
                type="text" placeholder={UpperCaseFirstLetter(field)}
                value={profile?.correspondence[field as keyof ExtendedCorrespondence]}
                onChange={(e) => dispatch({ type: "UPDATE_CORRESPONDENCE", payload: { name: field, value: e.target.value } })} />
        )
    })

    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-[600px] p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-center text-p-5">
                Correspondence
            </h2>
            {components}
            <PreviousNextButtons />
        </div>
    )
}
