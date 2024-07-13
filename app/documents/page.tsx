"use client";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Logo2 from "../Components/Images/Logo2";
import Navbar from "../Components/Navbar";
import { BACKEND_URL } from "../constants";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [documents, setDocuments] = useState<
    [
      {
        name: String | undefined;
        pages: String | undefined;
        url: String | undefined;
        document_id: number;
      }
    ]
  >();
  useEffect(() => {
    const client = new ApolloClient({
      uri: `${BACKEND_URL}/graphql`,
      cache: new InMemoryCache(),
      credentials: "include",
    });
    async function getDocuments() {
      try {
        const data = await client.query({
          query: gql`
            query RetrieveDocuments {
              RetrieveDocuments {
                pages
                document_id
                name
                url
              }
            }
          `,
        });
        console.log(data.data.RetrieveDocuments);
        setDocuments(data.data.RetrieveDocuments);
        return data;
      } catch (e) {
        console.error("Error" + e);
      }
    }
    getDocuments();
  }, []);

  const DocumentsJSX = (documents &&
    documents.map((document, index) => (
      <>
        <Link className="bg-gray-300 p-2" key={index} href={`/documents/reportgen/${document.document_id}`}>
          <div className="flex flex-col">
            <img className="max-h-[300px]" src=""/>
            <button className="text-black w-full">{document.name}</button>
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
