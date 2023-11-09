import { ProfileFormProvider } from "@/context/ProfileFormProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ProfileFormProvider>
                {children}
            </ProfileFormProvider>
        </div>
    )
}