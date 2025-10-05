import Link from "../link"
import Navbar from "./nav"

function Header() {
    return (
        <header className="bg-primary-foreground text-white py-6 shadow-md">
            <div className="container flex items-center justify-between">
                <Link href="/" className="text-xl font-medium">X-Center</Link>
                <Navbar />
            </div>
        </header>
    )
}

export default Header
