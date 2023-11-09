import { useContext, useState } from "react"
import { UserContext } from "@/context/profile-context"
import { ExtendedCorrespondence } from "@/types/Epas";
import UpperCaseFirstLetter from "@/utils/UpperCaseFirstLetter";
import addSpacesBeforeCapitalLetters from "@/utils/AddSpace";
import InputGenerator from "./InputGenerator";
import PreviousNextButtons from "./PreviousNextButtons";


export default function Individual() {

    const [socialsIndex, setSocialsIndex] = useState<number>(0);

    const [profile, dispatch] = useContext(UserContext);

    const nameFields = [
        "firstName", "lastName",
    ]

    const optionalNameFields = [
        "middleName", "suffix", "prefix"
    ]

    const correspondenceFields = [
        "email", "phone", "fax"
    ]

    const socials = [
        "linkedin", "slack", "discord", "instagram"
    ]

    const nameComponents = <InputGenerator fields={nameFields} />
    const optionalNameComponents = <InputGenerator fields={optionalNameFields} />
    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }

    const components = correspondenceFields.map(field => {

        return (
            <input
                key={field}
                type="text" placeholder={UpperCaseFirstLetter(addSpacesBeforeCapitalLetters(field))}
                value={profile?.correspondence[field as keyof ExtendedCorrespondence]}
                onChange={(e) => dispatch({ type: "UPDATE_CORRESPONDENCE", payload: { name: field, value: e.target.value } })} />
        )
    })

    const socialsComponents = socials.map((social, index) => {
        return (
            <div key={social} className={`w-full items-center justify-center flex ${index === socialsIndex ? "bg-p-5 rounded-xl" : ""}`} onClick={() => setSocialsIndex(index)}>

                <img key={social} src={`/${social}.svg`} alt="" className="w-16 h-16 rounded-xl" />
            </div >
        )
    })

    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-auto p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-center text-p-5">
                Correspondence
            </h2>
            <div className="flex-row flex gap-4">
                {nameComponents}
            </div>
            <div className="flex-row flex gap-4">
                {optionalNameComponents}
            </div>
            {components}
            <div>
                <h2 className="text-center text-p-5">Socials</h2>
                <div className="flex flex-row">
                    {socialsComponents}
                </div>
                <input type="text" placeholder={UpperCaseFirstLetter(socials[socialsIndex])}
                    value={profile?.correspondence[socials[socialsIndex] as keyof ExtendedCorrespondence]}
                    onChange={(e) => dispatch({ type: "UPDATE_CORRESPONDENCE", payload: { name: socials[socialsIndex], value: e.target.value } })}
                />
            </div>
            <PreviousNextButtons />
        </div>
    )
}

