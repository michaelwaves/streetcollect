"use client"
import { FirebaseUserContext } from "./firebase-context";
import { useState, useEffect, useContext } from "react"
import { WalletContext } from "./wallet-context";
import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";

export const FirebaseUserProvider = ({ children }: { children: any }) => {
    const { wallet, isSignedIn, contractId } = useContext(WalletContext)!
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        const getUser = async () => {
            if (isSignedIn) {
                try {
                    const userDocRef = doc(db, "profiles", wallet.accountId)
                    const data = await getDoc(userDocRef)
                    if (data.exists()) {
                        setUserData(data.data())
                    } else {
                        console.log("no such user")
                    }
                    setLoading(false)
                } catch (error) {
                    setError(error)
                    setLoading(false)

                }
            }
        }
        getUser()
    }, [isSignedIn])
    return (
        <FirebaseUserContext.Provider value={{ userData, loading, error }}>
            {children}
        </FirebaseUserContext.Provider>
    )
}