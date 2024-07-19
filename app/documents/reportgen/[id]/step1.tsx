import { Dispatch, SetStateAction, useRef } from "react";
import ButtonYellow1 from "../../../Components/Buttons/ButtonYellow1";
import { ReportGenCommonProps } from "./common";
import { Page } from "../../../types/types";
import { CurrentView } from "./types";

export default function Step1(props: ReportGenCommonProps) {
  const chapterNameRef = useRef<HTMLInputElement>(null);
  const { setCurrentView, pages, setPages, currentPage } = props;
  function nextPage() {
    if (!chapterNameRef.current) {
      return;
    }

    if (!chapterNameRef.current.value) {
      return;
    }
    const newPageDetails: Page = {
      name: chapterNameRef.current.value,
      elements: [],
    };

    const newPages = [...pages, newPageDetails];
    setPages([...newPages]);
    localStorage.setItem("pages", JSON.stringify(newPages));
    setCurrentView(CurrentView.ENTER_CONTENT_VIEW);
  }

  return (
    <div className="h-full w-full flex flex-col md:flex-row justify-center items-start gap-4 md:items-center md:gap-8">
        <img className="mx-auto md:mx-0" src="/images/chapter_name.png" />
        <div className="mx-auto md:mx-0 flex flex-col gap-4 items-start">
          <div className="flex flex-col gap-2">
            <div className="text-white text-xl font-bold">
              Enter The Chapter Name
            </div>
            <input
              ref={chapterNameRef}
              className="px-2 py-3 w-full rounded-lg text-center font-extrabold "
              placeholder="This Will Appear On Your Index"
            />
          </div>
          <ButtonYellow1 content={"Next ->"} onClick={nextPage} />
      </div>
    </div>
  );
}
