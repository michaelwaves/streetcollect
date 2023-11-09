"use client"
import { use, useContext, useEffect } from "react"
import { UserContext } from "@/context/profile-context"
import Business from "@/components/Forms/Business"
import EntityType from "@/components/Forms/EntityType"
import Individual from "@/components/Forms/Individual"
import USASelect from "@/components/Forms/USASelect"
import Address from "@/components/Forms/Address"
import Review from "@/components/Forms/Review"
import { WalletContext } from "@/context/wallet-context"

export default function Profile() {
    const [profile, dispatch] = useContext(UserContext);
    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!

    useEffect(() => {
        if (isSignedIn && dispatch) {
            dispatch({ type: "SET_ACCOUNT_ID", payload: { name: "", value: wallet.accountId } })
        }
    }, [isSignedIn, dispatch, wallet.accountId])

    if (dispatch === undefined) {
        return <div>Dispatch Function is Not Defined!</div>
    }

    const pages = [{
        major: false,
        name: "Entity",
        emoji: "👤"
    },
    {
        major: true,
        name: "Correspondence",
        emoji: "📬"
    },
    {
        major: false,
        name: "USA",
        emoji: "🦅"
    },
    {
        major: true,
        name: "Address",
        emoji: "🏠"
    },
    {
        major: true,
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

    return (
        <div className="w-full flex items-center flex-col justify-center gap-4">
            <h1>Profile</h1>
            <div className="flex flex-row gap-4 md:w-[clamp(500px,60vw,800px)] w-full justify-center">
                {pageSelector}
            </div>
            {profile?.index == 0 && <EntityType />}
            {profile?.index == 1 && profile.type == "company" && <Business />}
            {profile?.index == 1 && profile.type == "individual" && <Individual />}
            {profile?.index == 2 && <USASelect />}
            {profile?.index == 3 && <Address />}
            {profile?.index == 4 && <Review />}
            <div className="flex flex-row gap-4 md:w-[clamp(500px,60vw,800px)] w-full justify-center">
                {pageSelector}
            </div>
            <div className="w-[600px] flex h-auto ">
                {JSON.stringify(profile)}
            </div>
        </div>
    )
}