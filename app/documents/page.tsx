"use client";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Logo2 from "../Components/Images/Logo2";
import Navbar from "../Components/Navbar";
import { BACKEND_URL } from "../constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pages } from "../types/types";

export default function Page() {
  const router = useRouter();
  const [documents, setDocuments] = useState<{
    [key: string]: {
      url: string;
      pages: Pages;
      documentID: string;
    };
  }>();

  function loadReport(pagesData: Pages) {
    localStorage.setItem("pages", JSON.stringify(pagesData));
    router.push("/documents/reportgen/0");
  }
  useEffect(() => {
    async function getDocuments() {
      try {
        const history: {
          [key: string]: {
            url: string;
            pages: Pages;
            documentID: string;
          };
        } = JSON.parse(localStorage.getItem("history") || "{}");
        setDocuments(history);
        console.log(history)
      } catch (e) {
        console.error("Error" + e);
      }
    }
    getDocuments();
  }, []);

  const DocumentsJSX = (documents &&
    Object.entries(documents).map(([key, document]) => {
      return (
        <div
          key={key}
          className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-800 ">
            {document.documentID}
          </h3>

          <div className="space-x-2">
            <button
              onClick={() => loadReport(document.pages)}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
            >
              Edit Report
            </button>
            <button
              onClick={() => window.open(document.documentID, "_blank")}
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 focus:outline-none transition-colors"
            >
              Download
            </button>
          </div>
        </div>
      );
    })) || (
    <div className="text-center text-gray-600 py-8">
      {"You don't have any documents yet."}
    </div>
  );

  return (
    <div className="text-white min-h-screen  h-full w-screen text-lg  bg-[#00162B] font-extrabold">
      <div className="flex h-fit items-center justify-around">
        <Logo2 />
        <Navbar />
      </div>
      <div className="h-full w-full p-4 flex flex-col gap-2">
        <div className="text-center">Your Files</div>
        <div className="grid grid-cols-1 gap-2">{DocumentsJSX}</div>
      </div>
    </div>
  );
}
