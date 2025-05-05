import Link from "next/link"


export const Navbar = () => {

    return (
        <nav className="sticky top-0 z-50 bg-softgray shadow">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div>
                    <Link className="font-bold text-2xl text-black" href="/">
                    Pika network
                    </Link>
                </div>
                <div className="flex flex-row gap-5">
                    <Link className="text-black font-semibold text-xl" href="/">Home</Link>
                    <Link className="text-black font-semibold text-xl" href="/">Sum link</Link>
                    <Link className="text-black font-semibold text-xl" href="/">Sum other link</Link>
                </div>
            </div>
        </nav>
    )
}

