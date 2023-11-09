"use client"
import { handleSignOut } from "@/lib/Firebase";


function Page() {
    return (<div>
        <button onClick={handleSignOut}>Sign Out</button>
    </div>);
}

export default Page;