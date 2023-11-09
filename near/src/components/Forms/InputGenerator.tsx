import { useContext } from "react"
import { UserContext } from "@/context/profile-context"
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import addSpacesBeforeCapitalLetters from "@/utils/AddSpace";
import { UserProfile } from "@/types/UserProfile";

export default function InputGenerator({ fields }: { fields: string[] }) {
    const [profile, dispatch] = useContext(UserContext);
    return (
        fields.map(field => {
            if (dispatch === undefined) {
                return <div key={field}>Dispatch Function is Not Defined!</div>
            }

            const value = profile?.[field as keyof UserProfile]
            return (
                <input
                    key={field}
                    type="text" placeholder={UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(field))}
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => dispatch({ type: "UPDATE_PROFILE", payload: { name: field, value: e.target.value } })} />
            )
        })
    )
}