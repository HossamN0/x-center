import { getServerSession, Session } from "next-auth"
import Link from "../link"
import Navbar from "./nav"
import { authOptions } from "@/server/auth"

async function Header() {
    const initialSession: Session | null = await getServerSession(authOptions);
    return (
        <header className="bg-primary-foreground text-white py-6 shadow-md">
            <div className="container flex items-center justify-between gap-20">
                <Link href="/" className="text-xl font-medium">X-Center</Link>
                <Navbar initialSession={initialSession} />
            </div>
        </header>
    )
}

export default Header
