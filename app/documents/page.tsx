"use client";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Logo2 from "../Components/Images/Logo2";
import Navbar from "../Components/Navbar";
import { BACKEND_URL } from "../constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pages } from "../types/types";

export default function Page() {
  const [documents, setDocuments] = useState<
    {
      url: string;
      pages: Pages;
      documentID: string;
    }[]
  >();
  useEffect(() => {
    async function getDocuments() {
      try {
        const history: {
          url: string;
          pages: Pages;
          documentID: string;
        }[] = JSON.parse(localStorage.getItem("history") || "[]");
        console.log(history);
        setDocuments(history);
      } catch (e) {
        console.error("Error" + e);
      }
    }
    getDocuments();
  }, []);

  const DocumentsJSX = (documents &&
    documents.map((document, index) => (
      <>
        <Link
          className="bg-gray-300 p-2"
          key={index}
          href={`/documents/reportgen/${document.pages[0].name}`}
        >
          <div className="flex flex-col">
            <img className="max-h-[300px]" src="" />
            <button className="text-black w-full">
              {document.documentID}
            </button>
          </div>
        </Link>
      </>
    ))) || <div>You don&apos;t have any documents yet</div>;

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
