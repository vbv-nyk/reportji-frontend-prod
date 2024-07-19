"use client";
import Image from "next/image";
import Navbar from "./Components/Landing";
import Landing from "./Components/Landing";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useEffect } from "react";

export default function Home() {
  return <Landing />
}
