"use client";
import ButtonYellow1 from "@/app/Components/Buttons/ButtonYellow1";
import { ReportGenCommonProps } from "../common";
import { CurrentView } from "../types";
import ButtonYellow2 from "@/app/Components/Buttons/ButtonYellow2";
import { PageToJi } from "./language";
import { gql, useMutation } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  DragDropContext,
  OnDragEndResponder,
  Droppable,
  DroppableProvided,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useRef } from "react";

const CREATE_FILE = gql`
  mutation getOutputTex(
    $inputJi: String!
    $name: String!
    $pagesData: String!
    $docID: Int
  ) {
    CreateTexFile(
      inputJi: $inputJi
      name: $name
      pagesData: $pagesData
      docID: $docID
    ) {
      err
      errMsg
      tex
      document_id
    }
  }
`;
export default function ViewPages(props: ReportGenCommonProps) {
  const {
    setCurrentView,
    setCurrentPage,
    pages,
    setPages,
    setOutputData,
    documentID,
    setDocumentID,
  } = props;

  const [getReport, { loading, error }] = useMutation(CREATE_FILE);
  const doc_ref = useRef<HTMLInputElement>(null);

  function newChapter() {
    setCurrentPage(pages.length);
    setCurrentView(CurrentView.ENTER_CHAPTER_VIEW);
  }

  function editChapter(index: number) {
    setCurrentPage(index);
    setCurrentView(CurrentView.ENTER_CONTENT_VIEW);
  }
  function deleteChapter(index: number) {
    const pagesClone = pages.filter((page, i) => {
      return index != i;
    });
    setPages(pagesClone);
    localStorage.setItem("pages", JSON.stringify(pagesClone));
  }

  function getCurrentTemplate() {
    return `\\documentclass[oneside]{book}
\\usepackage[T1]{fontenc}
\\usepackage[demo]{graphicx}
\\usepackage{grffile}
\\usepackage{tocloft}
\\usepackage{mathptmx}
\\usepackage[a4paper, total={6in, 8in}]{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{color}
\\usepackage{tabularx}
\\usepackage{listings}
\\usepackage{subcaption}
\\definecolor{myorange}{RGB}{131,59, 12}
\\usepackage{titlesec}

\\titleformat{\\chapter}[display]
{\\normalfont\\fontsize{16}{22}\\selectfont\\bfseries}
  {\\MakeUppercase{\\chaptertitlename} \\thechapter}
{10pt}
{\\centering\\fontsize{18}{22}\\selectfont}
\\titlespacing*{\\chapter}{0pt}{-20pt}{20pt}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\normalsize}{\\fontsize{12}{14}\\selectfont}
\\DeclareUnicodeCharacter{2212}{\\ensuremath{-}}\\newcommand{\\osquare}{[}
\\newcommand{\\csquare}{]}
\\newcommand{\\oround}{(}
\\newcommand{\\cround}{)}
\\newcommand{\\ocurly}{\\text{\\{}}
\\newcommand{\\ccurly}{\\text{\\}}}
\\newcommand{\\quotes}{"}
\\newcommand{\\codelst}[1]{\\lstinline{#1}}
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}
\\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}
\\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}
  \\fancyfoot[R]{\\color{black}\\fontsize{12}{20}\\selectfont Page \\thepage}
\\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}
\\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}
\\fancypagestyle{plain}{
  \\fancyhf{}
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}
  \\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}
  \\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}
  \\fancyfoot[R]{\\fontsize{12}{20}\\selectfont \\color{black}Page \\thepage}
  \\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}
  \\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}
}
\\linespread{1.5}
\\usepackage{float}
\\restylefloat{figure}
\\lstset{
  backgroundcolor=\\color{white},
  basicstyle=\\ttfamily\\color{black},
  escapeinside={||},
  breaklines=true,
  lineskip=2pt,
}
\\begin{document}
\\setcounter{page}{0}
\\tableofcontents
\\newpage\\listoffigures
\\clearpage
\\pagenumbering{arabic}
\\setcounter{page}{1}
    `;
  }
  async function generateReport() {
    if (!doc_ref.current || !doc_ref.current.value) return;
    console.log(pages);
    let inputJi = `${getCurrentTemplate()}\n${PageToJi(
      pages
    )}\n\\end{document}`;
    setOutputData(inputJi);
    setDocumentID(doc_ref.current.value);
    setCurrentView(CurrentView.REPORT_VIEW);
  }

  function PageList(provided: DroppableProvided) {
    if (pages.length == 0) {
      return (
        <div className="flex flex-col gap-2">
          <div className="text-white font-bold text-3xl">Your Pages</div>
          <div className="text-white font-light">
            You do not have any chapters yet, click below to start a new
            chapter.
          </div>
        </div>
      );
    } else {
      return (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {pages.map((page, index) => {
            return (
              <Draggable key={index} draggableId={`${index}`} index={index}>
                {(childProvided) => (
                  <div
                    {...childProvided.draggableProps}
                    {...childProvided.dragHandleProps}
                    ref={childProvided.innerRef}
                    key={index}
                    className="flex border-black border-2 w-full bg-gray-300 rounded-lg px-4 py-2 justify-between items-center"
                  >
                    <div className="text-md whitespace-nowrap">{page.name}</div>
                    <div className="flex gap-4 ">
                      <ButtonYellow2
                        content={"Edit"}
                        onClick={() => {
                          editChapter(index);
                        }}
                      />
                      <ButtonYellow2
                        content={"Delete"}
                        onClick={() => {
                          deleteChapter(index);
                        }}
                      />
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            );
          })}
        </div>
      );
    }
  }
  function onDragEnd(result: DropResult) {
    const pagesClone = pages.map((page) => page);
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    const pageElementsClone = Array.from(pages);
    const [movedItem] = pageElementsClone.splice(source.index, 1);
    pageElementsClone.splice(destination.index, 0, movedItem);
    setPages(pageElementsClone);
    localStorage.setItem("pages", JSON.stringify(pagesClone));
  }
  return (
    <div className="w-full flex flex-col gap-5">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="UniqueID1">
          {(provided) => {
            return PageList(provided);
          }}
        </Droppable>
      </DragDropContext>
      <div className="flex flex-row items-start justify-between gap-4">
        <ButtonYellow2 onClick={newChapter} content={"Add Page"} />
        {pages.length != 0 && (
          <div className="flex flex-col gap-2">
            <input
              ref={doc_ref}
              defaultValue={"Report"}
              placeholder="Enter the name of your report"
              className="p-2 rounded-xl text-center"
            />
            <ButtonYellow2
              onClick={generateReport}
              content={"Give Me My Report!!!"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
