"use client"
import UploadPatentContextProvider from "@/context/UploadContextProvider"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <UploadPatentContextProvider>
                {children}
            </UploadPatentContextProvider>
        </div>
    )
}