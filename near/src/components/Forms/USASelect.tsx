import { useContext } from "react"
import { UserContext } from "@/context/profile-context"


export default function USASelect() {
    const [profile, dispatch] = useContext(UserContext);

    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }

    const handleUS = () => {
        dispatch({ type: "SET_USA", payload: { name: "", value: "" } })
        dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })
    }

    const handleNonUS = () => {
        dispatch({ type: "SET_NON_USA", payload: { name: "", value: "" } })
        dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })
    }
    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-[600px] p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h1 className="text-p-5">Are you in the United States?</h1>
            <button className="animated-underline text-5xl"
                onClick={() => handleUS()}
            >Yes</button>
            <button className="animated-underline text-5xl"
                onClick={() => handleNonUS()}
            >No</button>
            <button className="text-4xl animated-underline"
                onClick={() => dispatch({ type: "DECREMENT_INDEX", payload: { name: "", value: "" } })}
            >Previous</button>
        </div>
    )
}