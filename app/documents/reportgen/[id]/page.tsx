"use client";
import { useEffect, useState } from "react";
import Logo2 from "../../../Components/Images/Logo2";
import Navbar from "../../../Components/Navbar";
import { Common, Progress } from "./common";
import Step1 from "./step1";
import Step2 from "./step2";
import { CurrentView } from "./types";
import { Pages } from "../../../types/types";
import ViewPages from "./ViewPages/ViewPages";
import ViewPagesHeader from "./ViewPages/ViewPagesHeader";
import { json } from "stream/consumers";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Step3 from "./step3";
import { BACKEND_PORT, BACKEND_URL } from "../../../constants";

export default function Page({ params }: { params: { id: number } }) {
  const [currentView, setCurrentView] = useState(CurrentView.SHOW_PAGES_VIEW);
  const [pages, setPages] = useState<Pages>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [outputData, setOutputData] = useState<string>("");
  const [displayRow, setDisplayRow] = useState(80);
  const [documentID, setDocumentID] = useState<number | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  console.log(pages)
  useEffect(() => {
    async function generateReportFromLLM() {
      setIsGeneratingReport(true);
      const response = await fetch("http://localhost:5000/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell server we're sending JSON
        },
        body: JSON.stringify({
          userPrompt: "Can you generate a report on taxes", // Convert object to JSON string
        }),
      });

      setIsGeneratingReport(false);
      console.log(response)
      if (!response.ok) {
        console.error("Failed to fetch:", response.statusText);
        return;
      }

      const data = await response.json();
      setPages(data.response); // Ensure setPages is a valid function
      setCurrentView(CurrentView.SHOW_PAGES_VIEW);
    }

    // Call the function (ensure it's in a React useEffect or proper async handling)
    generateReportFromLLM();
  }, []);

  const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
  });
  // useEffect(() => {
  //   const retrieveDocument = async () => {
  //     try {
  //       const data = await client.query({
  //         query: gql`
  //           query DocumentByID($document_id: Int!) {
  //             DocumentByID(document_id: $document_id) {
  //               pages
  //               document_id
  //               name
  //               url
  //             }
  //           }
  //         `,
  //         variables: { document_id: documentID ? documentID : +params.id },
  //       });
  //       setDocumentID(+params.id);
  //       setPages(JSON.parse(data.data.DocumentByID.pages));
  //     } catch (e) {
  //       console.log(documentID, params.id);
  //       console.log("Error" + e);
  //     }
  //   };
  //   if (params.id != 0) {
  //     retrieveDocument();
  //   } else {
  //     const pagesData = localStorage.getItem("pages");
  //     if (pagesData !== null) {
  //       setPages(JSON.parse(pagesData));
  //     }
  //   }
  // }, []);

  const props = {
    currentView,
    setCurrentView,
    pages,
    setPages,
    currentPage,
    setCurrentPage,
    outputData,
    setOutputData,
    documentID,
    setDocumentID,
  };
  const HeaderSection = () => {
    switch (currentView) {
      case CurrentView.SHOW_PAGES_VIEW:
        return (
          <>
            <div className="">
              <ViewPagesHeader {...props} />
            </div>
            <div className="flex items-center justify-center">
              <Progress pageNumber={currentView} />
            </div>
          </>
        );
      case CurrentView.ENTER_CHAPTER_VIEW:
      case CurrentView.ENTER_CONTENT_VIEW:
        return (
          <>
            <div className="">
              <Common />
            </div>
            <div className="flex items-center justify-center ">
              <Progress pageNumber={currentView} />
            </div>
          </>
        );
      case CurrentView.REPORT_VIEW:
        return (
          <>
            <div className="">
              <ViewPagesHeader {...props} />
            </div>
            <div className="flex items-center justify-center">
              <Progress pageNumber={currentView} />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (currentView == CurrentView.REPORT_VIEW) {
      setDisplayRow(0);
    } else {
      setDisplayRow(80);
    }
  }, [currentView]);

  if (isGeneratingReport) {
    return <p>Generating</p>;
  }
  
  return (
    <ApolloProvider client={client}>
      <div className="py-6 bg-[#01162B] flex flex-col gap-4 min-h-screen h-full">
        <div className="flex justify-around">
          <Logo2 />
          <Navbar />
        </div>
        {HeaderSection()}
        <div className="h-full w-10/12 flex mx-auto">
          {currentView == CurrentView.SHOW_PAGES_VIEW && (
            <ViewPages {...props} />
          )}
          {currentView == CurrentView.ENTER_CHAPTER_VIEW && (
            <Step1 {...props} />
          )}
          {currentView == CurrentView.ENTER_CONTENT_VIEW && (
            <Step2 {...props} />
          )}
          {currentView == CurrentView.REPORT_VIEW && <Step3 {...props} />}
        </div>
      </div>
    </ApolloProvider>
  );
}
