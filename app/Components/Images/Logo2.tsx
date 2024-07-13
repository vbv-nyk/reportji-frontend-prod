import Link from "next/link";

export default function Logo2() {
  return (
    <Link href={"/"}>
      <img className="h-24 md:h-36" src="/images/logo_blue.png"></img>
    </Link>
  );
}
