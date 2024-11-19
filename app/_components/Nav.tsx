import Image from "next/image";
import Link from "next/link";

function Nav() {
  return (
    <nav className="py-6 flex justify-between items-center">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={100}
          style={{ width: "auto" }}
        />
      </Link>
      <ul className="flex gap-12 list-none">
        <li>
          <Link
            href="/recipes"
            className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Recipes
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
