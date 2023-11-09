import { useContext } from "react";
import { UserContext } from "@/context/profile-context";

export default function PreviousNextButtons() {
    const [state, dispatch] = useContext(UserContext);
    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }
    return (
        <div className="flex flex-row justify-between w-full">
            <button className="text-4xl animated-underline"
                onClick={() => dispatch({ type: "DECREMENT_INDEX", payload: { name: "", value: "" } })}
            >Previous</button>
            <button className="text-4xl animated-underline"
                onClick={() => dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })}
            >Next</button>
        </div>
    )
}