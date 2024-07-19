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
    return `
    \\documentclass[oneside]{book}\n
\\usepackage[T1]{fontenc}\n
\\usepackage[demo]{graphicx}\n
\\usepackage{grffile}\n
\\usepackage{tocloft}\n
\\usepackage{mathptmx}\n
\\usepackage[a4paper, total={6in, 8in}]{geometry}\n
\\usepackage{hyperref}\n
\\usepackage{xcolor}\n
\\usepackage{titlesec}\n
\\usepackage{color}\n
\\usepackage{tabularx}\n
\\usepackage{listings}\n
\\usepackage{subcaption}\n
\\definecolor{myorange}{RGB}{131,59, 12}\n
\\usepackage{titlesec}\n
\n
\\titleformat{\\chapter}[display]\n
{\\normalfont\\fontsize{16}{22}\\selectfont\\bfseries}\n
  {\\MakeUppercase{\\chaptertitlename} \\thechapter}\n
{10pt}\n
{\\centering\\fontsize{18}{22}\\selectfont}\n
\\titlespacing*{\\chapter}{0pt}{-20pt}{20pt}\n
\\usepackage{fancyhdr}\n
\\pagestyle{fancy}\n
\\fancyhf{}\n
\\renewcommand{\\normalsize}{\\fontsize{12}{14}\\selectfont}\n
\\DeclareUnicodeCharacter{2212}{\\ensuremath{-}}\\newcommand{\\osquare}{[}\n
\\newcommand{\\csquare}{]}\n
\\newcommand{\\oround}{(}\n
\\newcommand{\\cround}{)}\n
\\newcommand{\\ocurly}{\\text{\\{}}\n
\\newcommand{\\ccurly}{\\text{\\}}}\n
\\newcommand{\\quotes}{"}\n
\\newcommand{\\codelst}[1]{\\lstinline{#1}}\n
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}\n
\\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}\n
\\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}\n
  \\fancyfoot[R]{\\color{black}\\fontsize{12}{20}\\selectfont Page \\thepage}\n
\\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}\n
\\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}\n
\\fancypagestyle{plain}{\n
  \\fancyhf{}\n
  \\fancyhead[L]{\\color{black}\\fontsize{12}{20}\\selectfont\\bfseries\\textbf{ReportJi}}\n
  \\fancyhead[R]{\\color{black}\\textbf{\\leftmark}}\n
  \\fancyfoot[L]{\\color{black} \\fontsize{12}{20}\\selectfont\\textbf{Department of Computer Science}}\n
  \\fancyfoot[R]{\\fontsize{12}{20}\\selectfont \\color{black}Page \\thepage}\n
  \\renewcommand{\\headrule}{\\color{myorange}\\hrule height 0.4pt}\n
  \\renewcommand{\\footrule}{\\color{myorange}\\hrule height 0.4pt}\n
}\n
\\linespread{1.5}\n
\\usepackage{float}\n
\\restylefloat{figure}\n
\\lstset{\n
  backgroundcolor=\\color{white},\n
  basicstyle=\\ttfamily\\color{black},\n
  escapeinside={||},\n
  breaklines=true,\n
  lineskip=2pt,\n
}
\\begin{document}
    `;
  }
  async function generateReport() {
    if (!doc_ref.current || !doc_ref.current.value) return;
    let doc_name = doc_ref.current.value;
    let inputJi = "";
    inputJi = `inputJi.concat(${getCurrentTemplate()})\n${PageToJi(pages)}\n\\end{document}}`;
    console.log(inputJi)
    const pagesData = PageToJi(pages);
    inputJi = inputJi.concat("output = {\n}");
    try {
      const data = await getReport({
        variables: {
          inputJi,
          name: doc_name,
          pagesData: JSON.stringify(pages),
          docID: documentID,
        },
      });
      const { CreateTexFile } = data.data;
      setOutputData(CreateTexFile.tex);
      setDocumentID(CreateTexFile.document_id);
      setCurrentView(CurrentView.REPORT_VIEW);
    } catch (e) {
      console.log("Error: ", e);
    }
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
