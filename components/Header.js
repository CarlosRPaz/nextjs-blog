import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div>
      <div className="flex justify-between max-w-6xl px-5 py-5 mx-auto">
        <div className="relative w-24 h-14 cursor-pointer">
          <Link href="/">
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
              className=""
            />
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Link href="/">
            <a className="mr-10 navLink">Home</a>
          </Link>
          <Link href="/about">
            <a className="mr-10 navLink">About</a>
          </Link>
          <Link href="/contact">
            <a className="navLink">Contact</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
