import Link from "next/link";

export default function Logo3() {
  return (
    <Link href={"/"}>
      <div className="flex flex-col">
        <text className="text-white font-extrabold italic">ReportEase</text>
        <text className="text-white font-light italic text-xs">Because your time matters.</text>
      </div>
    </Link>
  );
}
