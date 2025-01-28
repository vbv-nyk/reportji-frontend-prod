import Link from "next/link";

export default function Logo2() {
  return (
    <Link href={"/"}>
      <img className="h-max" src="/images/logo_blue.png"></img>
    </Link>
  );
}
