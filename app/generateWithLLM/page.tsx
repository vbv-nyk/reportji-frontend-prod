"use client";
import Link from "next/link";
import ButtonBlue1 from "../Components/Buttons/ButtonBlue1";
import ButtonWhite2 from "../Components/Buttons/ButtonWhite2";
import Navbar from "../Components/Navbar";
import Logo1 from "../Components/Images/Logo1";
import Logo2 from "../Components/Images/Logo2";
import Logo3 from "../Components/Images/Logo3";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import UserInput from "./UserInput";


export default function Page() {
  const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
  });
  return (
    <ApolloProvider client={client}>
      <UserInput />
    </ApolloProvider>
  );
}
