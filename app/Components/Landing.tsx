import Link from "next/link";
import Navbar from "./Navbar";
import ButtonWhite1 from "./Buttons/ButtonWhite1";
import Logo2 from "./Images/Logo2";
import { useEffect } from "react";
import { BACKEND_URL } from "../constants";

export default function Landing() {
  return (
    <div className="flex flex-col bg-[#01162B] h-screen overflow-y-scroll">
      <div className="pt-6 flex h-max items-center justify-around">
        <Logo2 />
        <Navbar />
      </div>
      <div className="md:h-full md:grid md:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center items-center ">
          <img
            className="max-h-[300px] lg:hidden"
            src="images/laptop-report.webp"
          ></img>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col">
              <div className="text-white font-extrabold text-3xl">
                Report Making
              </div>
              <div className="text-white font-extrabold text-3xl">
                Made{" "}
                <span className="font-extrabold text-yellow-400 text-3xl">
                  Easier.
                </span>
              </div>
            </div>
            <Link href={"/choice"}>
              <ButtonWhite1 />
            </Link>
          </div>
        </div>
        <div className="hidden md:inline md:self-center ">
          <img src="/images/big_man.png"></img>          
        </div>
      </div>
    </div>
  );
}
