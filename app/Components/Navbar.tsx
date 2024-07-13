"use client";
import { useEffect, useState } from "react";
import { BACKEND_PORT, BACKEND_URL } from "../constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Link from "next/link";
export default function Navbar() {
  async function login() {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  }
  
  const [username, setUsername] = useState("");

  useEffect(() => {
  const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
    credentials: "include"
  });
    async function getUserData() {
      try {
        const data = await client.query({
          query: gql`
            query UserDetails {
              UserDetails {
                displayName
                id
              }
            }
          `,
        });
         setUsername(data.data.UserDetails.displayName);
        return data;
      } catch (e) {
        console.log("Error" + e);
      }
    }
    getUserData();
  }, []);
  return (
    <div className="flex flex-wrap text-center text-sm justify-center gap-2 px-2 items-center md:px-0 font-extrabold text-white uppercase md:text-md md:justify-evenly md:w-full">
      {!username && <button className="flex-grow uppercase hover:text-lg" onClick={login}>
        {`Sign In`}
      </button>}
      {username && <button className="flex-grow uppercase hover:text-lg" >
        {username}
      </button>}
      <Link className="flex-grow uppercase hover:text-lg" href={"/documents"}>
        <button>Documents</button>
      </Link>
      <Link className="flex-grow uppercase hover:text-lg"href={'/about'}>
      <button >About Us</button>
      </Link>
      <Link  href={"https://github.com/vbv-nyk/reportji-markup"} className="hidden hover:underline hover:underline-offset-4 sm:inline flex-grow uppercase hover:text-lg">
        Github
      </Link>
    </div>
  );
}
