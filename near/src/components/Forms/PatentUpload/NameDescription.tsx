import { useContext, useState } from "react"
import { PatentContext } from "@/context/upload-context";
import PreviousNextButtons from "./PreviousNextButtons";


export default function NameDescription() {

    const [profile, dispatch] = useContext(PatentContext);

    if (dispatch === undefined) {
        return <div>File Upload Dispatch Function is Not Defined!</div>
    }
    const handleChange = (e: any) => {
        dispatch({ type: "UPDATE_PATENT", payload: { name: e.target.name, value: e.target.value } })
    }



    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-fit p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-8 ">
            <h2 className="text-p-5">Title</h2>
            <input type="text" name="title" placeholder="Title" onChange={(e) => handleChange(e)}
                value={profile?.title}
                className="w-full bg-white rounded-xl " />
            <h2 className="text-p-5">Description</h2>
            <input type="text" name="description" placeholder="Add a brief description about your patents." onChange={(e) => handleChange(e)}
                value={profile?.description}
                className="w-full h-40 rounded-xl" />

            <PreviousNextButtons />
        </div>
    )
}