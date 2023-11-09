import { useContext, useState } from "react"
import { PatentContext } from "@/context/upload-context";
import PreviousNextButtons from "./PreviousNextButtons";


export default function SetPrice() {

    const [profile, dispatch] = useContext(PatentContext);

    if (dispatch === undefined) {
        return <div>File Upload Dispatch Function is Not Defined!</div>
    }


    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-fit p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-p-5">Add Price</h2>
            <input type="text" value={profile?.price}
                placeholder="Price"
                onChange={(e) => dispatch({ type: "SET_PRICE", payload: { name: "", value: e.target.value } })} />
            <PreviousNextButtons />
        </div>
    )
}