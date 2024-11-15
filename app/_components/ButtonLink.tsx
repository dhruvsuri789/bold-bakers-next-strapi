import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  varient: string;
  href: string;
}

function ButtonLink({ children, varient = "primary", href = "" }: ButtonProps) {
  let buttonClasses = "";

  switch (varient) {
    case "primary":
      buttonClasses =
        "bg-red-600 text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-red-500 transition-colors scroll-smooth";
      break;
    case "secondary":
      buttonClasses =
        "bg-white font-bold border border-red-600 text-red-600 px-6 py-3 rounded-lg text-sm hover:bg-red-50 transition-colors scroll-smooth";
      break;
    default:
      buttonClasses =
        "bg-red-600 text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-red-500 transition-colors scroll-smooth";
  }

  return (
    <Link className={buttonClasses} href={href}>
      {children}
    </Link>
  );
}

export default ButtonLink;
