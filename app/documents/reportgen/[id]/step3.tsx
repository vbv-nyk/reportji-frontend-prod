"use client";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ReportGenCommonProps } from "./common";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { gql, useMutation } from "@apollo/client";
import ButtonYellow2 from "../../../Components/Buttons/ButtonYellow2";
import { useEffect, useState } from "react";
import { CurrentView } from "./types";
import ButtonWhite1 from "@/app/Components/Buttons/ButtonWhite1";
import ButtonYellow1 from "@/app/Components/Buttons/ButtonYellow1";

const RETRIEVE_PDF = gql`
  mutation CreatePDF($texFile: String!, $docID: Int!) {
    CreatePDF(texFile: $texFile, docID: $docID) {
      pdf
    }
  }
`;
export default function Step3(props: ReportGenCommonProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  let [color, setColor] = useState("#ffffff");
  const { setOutputData, pages } = props;
  const [getPDF, { loading, error }] = useMutation(RETRIEVE_PDF);
  const [pdfData, setPdfData] = useState<string>("");
  const [copyButtonContent, setCopyButtonContent] = useState("Copy");
  const { outputData, setCurrentView, documentID } = props;
  async function retrievePDF() {
    try {
      const data = await getPDF({
        variables: { texFile: outputData, docID: 0 },
      });
      const base64PDF = data.data.CreatePDF.pdf;
      // console.log(data);
      const moveToHistory = {
        [documentID || "Unnamed"]: { url: base64PDF, pages, documentID, date: Date.now() },
      };
      if (documentID) {
        const currentHistory = JSON.parse(
          localStorage.getItem("history") || "[]"
        );
        localStorage.setItem(
          "history",
          JSON.stringify({
            ...currentHistory,
            ...moveToHistory,
          })
        );
      }
      setPdfData(`${base64PDF}?time=${Date.now()}`);
    } catch (e) {
      console.error("Error occured", e);
    }
  }
  function updateContent(content: string) {
    setOutputData(content);
  }
  function editPages() {
    setCurrentView(CurrentView.SHOW_PAGES_VIEW);
  }

  useEffect(() => {
    retrievePDF();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div className="h-full w-screen flex flex-col gap-2">
      <div className="h-full grid grid-cols-1 gap-2">
        <div className="flex flex-col gap-2 h-full">
          <div className="h-screen">
            <AceEditor
              mode={"latex"}
              height="100%"
              width="100%"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              value={outputData}
              onChange={updateContent}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <ButtonYellow2 content={"Go Back"} onClick={editPages} />
              <ButtonYellow2 content={"Run Code"} onClick={retrievePDF} />
              <ClipLoader
                color={"#ffffff"}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <ButtonYellow2
              content={copyButtonContent}
              onClick={() => {
                navigator.clipboard.writeText(outputData);
                setCopyButtonContent("Copied");
                setTimeout(() => {
                  setCopyButtonContent("Copy");
                }, 2000);
              }}
            />
          </div>
        </div>

        <div className="h-screen">
          {pdfData.length > 0 && (
            <object
              data={`${pdfData}`}
              // type="application/pdf"
              width="100%"
              height="100%"
            ></object>
          )}
        </div>
      </div>
    </div>
  );
}
