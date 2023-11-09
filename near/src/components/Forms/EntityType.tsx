import { useContext } from "react"
import { UserContext } from "@/context/profile-context"

export default function EntityType() {

    const [profile, dispatch] = useContext(UserContext);

    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }

    const handleIndividual = () => {
        dispatch({ type: "SET_INDIVIDUAL", payload: { name: "", value: "" } })
        dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })
    }

    const handleCompany = () => {
        dispatch({ type: "SET_BUSINESS", payload: { name: "", value: "" } })
        dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })
    }

    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-[600px] p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h1 className="text-p-5">Are you an individual or a company?</h1>
            <button className="animated-underline text-5xl" onClick={() => handleIndividual()}>Individual</button>
            <button className="animated-underline text-5xl" onClick={() => handleCompany()}>Company</button>
        </div>
    )
}