import { useContext, useState } from "react"
import { PatentContext } from "@/context/upload-context";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import PreviousNextButtons from "./PreviousNextButtons";
import FileDisplay from "./FileDisplay";
import PulseLoader from "react-spinners/PulseLoader";


export default function FileUpload() {
    const storageRef = ref(storage, 'files');

    const [profile, dispatch] = useContext(PatentContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentFiles, setCurrentFiles] = useState<FileList | null>(null);

    if (dispatch === undefined) {
        return <div>File Upload Dispatch Function is Not Defined!</div>
    }
    const handleLinksUpdate = (link: string) => {
        dispatch({ type: "ADD_ATTACHMENT_LINK", payload: { name: "attachmentLinks", value: link } })
    }

    const handleUpload = async () => {
        if (currentFiles === null) {
            alert("no files selected!")
            return;
        }
        setLoading(true);
        try {
            for (var i = 0; i < currentFiles.length; i++) {
                const file = currentFiles[i];
                const fileRef = ref(storageRef, file.name);
                await uploadBytes(fileRef, file);
                const link = await getDownloadURL(fileRef);
                console.log(link);
                handleLinksUpdate(link);
                setError(false);
                setSuccess(true);
                //dispatch({ type: "INCREMENT_INDEX", payload: { name: "", value: "" } })
            }
        }
        catch (error) {
            console.log(error)
            setError(true);
        }
        setLoading(false);
    }


    return (
        <div className="md:w-[clamp(500px,50vw,800px)] w-full h-fit p-8 px-16 rounded-xl bg-s-3 flex flex-col gap-16 ">
            <h2 className="text-p-5">Upload Files</h2>
            <input type="file" id="custom-input" name="custom-input" onChange={(e) => setCurrentFiles(e.target.files)} multiple={true}
                className="w-full h-60 bg-white rounded-xl hidden" />

            <label
                htmlFor="custom-input"
                className="flex items-center mr-4 py-2 px-4 w-full rounded-md border-0 font-semibold bg-pink-50 text-p-3 hover:bg-p-5 cursor-pointer"
            >
                <h2 className="mx-auto">Choose files</h2>
            </label>

            <FileDisplay fileList={currentFiles} />

            <button className="animated-underline text-5xl mx-auto" onClick={() => handleUpload()}>Upload</button>
            {loading && <div className="absolute top-0 left-0 w-full h-full bg-p-5 bg-opacity-50 flex items-center justify-center"><PulseLoader color={"#ffffff"} loading={loading} size={15} /></div>}
            {error && <p>Error!</p>}
            {success && <h2>Success!</h2>}
            <PreviousNextButtons />
        </div>
    )
}