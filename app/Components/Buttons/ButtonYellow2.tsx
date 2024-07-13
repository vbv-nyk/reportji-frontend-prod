import { MouseEventHandler } from "react";

export default function ButtonYellow2({content, onClick } : { content: String, onClick: MouseEventHandler}) {
  return (
    <button onClick={onClick} className="bg-[#FFB800] py-1 px-3 md:py-2 md:px-12 text-md text-white font-extrabold rounded-lg">
      {content}
    </button>
  );
}
