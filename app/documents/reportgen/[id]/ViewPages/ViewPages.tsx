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
import { collegeTemplate } from "@/app/documents/templates/college";
import { IEEE } from "@/app/documents/templates/ieee";

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
    outputFormat,
    setOutputFormat,
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

  function getCurrentTemplate(templateName: string) {
    switch (templateName) {
      case "COLLEGE":
        return collegeTemplate;
      case "IEEE":
        return IEEE;
    }
  }
  async function generateReport(outputFormat: string) {
    if (!doc_ref.current || !doc_ref.current.value) return;
    // console.log(pages);
    let inputJi = `${getCurrentTemplate(outputFormat)}\n${PageToJi(
      pages,
      outputFormat
    )}\n\\end{document}`;
    setOutputData(inputJi);
    setDocumentID(doc_ref.current.value);
    setCurrentView(CurrentView.REPORT_VIEW);
  }

  function PageList(provided: DroppableProvided) {
    if (pages.length == 0) {
      return (
        <div className="flex flex-col gap-2">
          <div className="text-white font-bold text-3xl">Your Chapters</div>
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
                    className="flex gap-2 border-black flex-wrap border-2 w-full bg-gray-300 rounded-lg px-4 py-2 justify-between items-center"
                  >
                    <div className="text-md whitespace-nowrap min-w-[250px]">{page.name}</div>
                    <div className="flex flex-wrap gap-4 ">
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
      <div className="flex flex-wrap flex-row items-start justify-between gap-4">
        <ButtonYellow2 onClick={newChapter} content={"Add Page"} />
        {pages.length != 0 && (
          <div className="flex flex-wrap flex-col gap-2">
            <div className="flex flex-wrap gap-4">
              <input
                ref={doc_ref}
                defaultValue={"Report"}
                placeholder="Enter the name of your report"
                className="p-2 rounded-xl text-center"
              />
              <select
                id="types"
                name="types"
                className="bg-white font-bold w-fit rounded-md pl-3 pr-4 py-3"
                onChange={(e) => setOutputFormat(e.target.value)}
                defaultValue={outputFormat}
              >
                <option value="COLLEGE">VTU</option>
                <option value="IEEE">IEEE</option>
              </select>
            </div>
            <ButtonYellow2
              content={"Give Me My Report!!!"}
              onClick={() => generateReport(outputFormat)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
