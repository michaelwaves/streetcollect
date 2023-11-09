"use client"
import React, { use, useContext, useEffect } from "react"
import { PatentContext } from "@/context/upload-context"
import { WalletContext } from "@/context/wallet-context"
import PatentNumbers from "@/components/Forms/PatentUpload/PatentNumbers"
import NameDescription from "@/components/Forms/PatentUpload/NameDescription"
import FileUpload from "@/components/Forms/PatentUpload/FileUpload"
import SetPrice from "@/components/Forms/PatentUpload/SetPrice"
import Review from "@/components/Forms/PatentUpload/Review"

export default function Upload() {
    const [profile, dispatch] = useContext(PatentContext);
    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!


    useEffect(() => {
        if (isSignedIn && dispatch) {
            dispatch({ type: "SET_OWNER_ID", payload: { name: "", value: wallet.accountId } })
        }
    }, [isSignedIn, dispatch, wallet.accountId])
    if (dispatch === undefined) {
        return <div>Main Dispatch Function is Not Defined!</div>
    }

    const pages = [{
        major: false,
        name: "Numbers",
        emoji: "🔢"
    },
    {
        major: false,
        name: "Details",
        emoji: "📝"
    },
    {
        major: false,
        name: "Files",
        emoji: "📁"
    },
    {
        major: false,
        name: "Price",
        emoji: "💰"
    },
    {
        major: false,
        name: "Review",
        emoji: "📝"
    }
    ]

    const pageSelector = pages.map((page, index) => {
        return (
            <div className="flex flex-col gap-2" key={page.name}>
                <button className={`lg:text-xl md:text-lg text-sm animated-underline px-2 content-none md:content-normal`}
                    onClick={() => dispatch({ type: "SET_INDEX", payload: { name: "", value: index } })}
                ><p className={`hidden md:block ${profile?.index == index ? "text-p-5" : "text-white"}`}>{page.name}</p>
                    <span className="md:hidden block">{page.emoji}</span>
                </button>
                {page.major && <div className="w-1 h-1 rounded-full mx-auto bg-p-3"></div>}
            </div>
        )
    })

    const SignInPrompt = ({children}:{children:React.ReactNode})=>{
        return(
            <div className="w-full flex items-center flex-col justify-center gap-4">
                {children}
                <button className="text-4xl animated-underline" onClick={()=>wallet.signIn()}>Sign In</button>
            </div>
        )
    }

    if(isSignedIn){
    return (
        <div className="w-full flex items-center flex-col justify-center gap-4">
            <h1>Upload Patent</h1>
            <div className="flex flex-row gap-4 md:w-[clamp(500px,60vw,800px)] w-full justify-center">
                {pageSelector}
            </div>
            {profile?.index == 0 && <PatentNumbers />}
            {profile?.index == 1 && <NameDescription />}
            {profile?.index == 2 && <FileUpload />}
            {profile?.index == 3 && <SetPrice />}
            {profile?.index == 4 && <Review />}
            <div className="flex flex-row gap-4 md:w-[clamp(500px,60vw,800px)] w-full justify-center">
                {pageSelector}
            </div>
            <div className="w-[600px] flex h-auto ">
                {JSON.stringify(profile)}
            </div>
        </div>
    )}else{
        return (
            <SignInPrompt>
                <h1>Sign in to post</h1>
            </SignInPrompt>
        )
    }
}