import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Bold Baking Basics",
    slug: "Bold Baking Basics",
  },
  {
    name: "Breads & Doughs",
    slug: "Breads & Doughs",
  },
  {
    name: "Breakfast",
    slug: "Breakfast",
  },
  {
    name: "Brownies & Bars",
    slug: "Brownies & Bars",
  },
  {
    name: "Cakes",
    slug: "Cakes",
  },
  {
    name: "Candy",
    slug: "Candy",
  },
  {
    name: "Cheesecakes",
    slug: "Cheesecakes",
  },
  {
    name: "Cookies",
    slug: "Cookies",
  },
  {
    name: "Cupcakes",
    slug: "Cupcakes",
  },
];

function Footer() {
  return (
    <footer className="grid grid-cols-[1fr,1fr,2fr,1fr] mt-8 gap-2 py-12">
      <div>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={100}
            style={{ width: "auto" }}
          />
        </Link>
        {/* Social Links */}
        <div></div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <span className="font-bold text-xl text-neutral-500">Quick Links</span>
        <ul className="list-none flex flex-col gap-2">
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
      </div>
      <div className="flex flex-col gap-4 items-start">
        <span className="font-bold text-xl text-neutral-500">
          Popular Categories
        </span>
        <ul className="list-none grid grid-cols-2 gap-2 gap-x-12">
          {categories.map((category) => {
            return (
              <li key={category.name}>
                <Link
                  href={`/recipes?category=${encodeURIComponent(
                    category.slug
                  )}`}
                  className="text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <span className="font-bold text-xl text-neutral-500">Subscribe</span>
        <div className="flex flex-col items-start gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-red-500 transition-colors scroll-smooth">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
