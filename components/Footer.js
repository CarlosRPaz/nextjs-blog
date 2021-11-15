import Link from "next/link";

function Footer() {
    return (
        <div className="h-40 mt-16 px-10 py-10 text-white bg-black bg-opacity-80">
            <Link href={`/`}>
                <a>Home</a>
            </Link>
            <Link href={`/about`}>
                <a>About</a>
            </Link>
            <Link href={`/contact`}>
                <a>Contact</a>
            </Link>
        </div>
    )
}

export default Footer
