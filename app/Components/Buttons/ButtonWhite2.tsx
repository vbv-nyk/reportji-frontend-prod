import Link from "next/link";

export default function ButtonWhite2() {
  return (
    <Link href={"https://www.ilovepdf.com/pdf_to_word"} target="_blank">
      <button className="text-[#00162B] text-lg  bg-white rounded-3xl py-3 px-8 font-extrabold">
        Convert File
      </button>
    </Link>
  );
}
