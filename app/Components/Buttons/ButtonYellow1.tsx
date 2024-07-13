import { MouseEventHandler } from "react";

export default function ButtonYellow1({content, onClick } : { content: String, onClick: MouseEventHandler}) {
  return (
    <button onClick={onClick} className="bg-[#FFB800] py-2 px-4 md:py-3 md:px-12 text-lg text-white font-extrabold rounded-xl">
      {content}
    </button>
  );
}
