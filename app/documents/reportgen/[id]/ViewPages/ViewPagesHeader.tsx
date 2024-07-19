import { ReportGenCommonProps } from "../common";
import { CurrentView } from "../types";

export default function ViewPagesHeader(props: ReportGenCommonProps) {
  function userMessage(currentView: CurrentView){
    switch(currentView) {
      case CurrentView.SHOW_PAGES_VIEW:
        return "Create, View, Reorder Or Delete Chapters"
      case CurrentView.REPORT_VIEW:
        return "Report Has Been Generated, Scroll Down!!"
    }
  }
    return (<div className="flex flex-col gap-8 items-center">
      <p className="text-white font-bold">
        {userMessage(props.currentView)}
      </p>
    </div>)
}