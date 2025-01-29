import Link from "next/link";
import ButtonBlue1 from "../Components/Buttons/ButtonBlue1";
import ButtonWhite2 from "../Components/Buttons/ButtonWhite2";
import Navbar from "../Components/Navbar";
import Logo1 from "../Components/Images/Logo1";
import Logo2 from "../Components/Images/Logo2";

export default function Page() {
  return (
    <div className="h-screen">
        
      <div className="bg-[#01162B] flex items-center justify-around">
        <Logo2/>
        <Navbar />
      </div>
      <div className="h-full">
        <div className="h-full grid grid-cols-1  md:grid-cols-2">
          <div className="h-full flex flex-col justify-center items-center p-2">
            <img className="h-[300px] " src="/images/generate_report.png"></img>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col">
                <p className="font-extrabold text-center">
                  Add Content And Get Your Report Ready In Minutes!
                </p>
                <div className="text-center text-xl font-extrabold uppercase">
                  T<span className="underline underline-offset-8">ry no</span>w!
                </div>
              </div>
              <Link href={"/documents/reportgen/0"}>
                <ButtonBlue1 />
              </Link>
            </div>
          </div>
          <div className="h-full bg-[#00162B] p-2">
            <div className="h-full flex flex-col justify-center items-center">
              <img
                className="px-12 -mt-[8px] h-[300px] min-w-[300px]"
                src="images/file_conversion.png"
              ></img>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col">
                  <p className="font-extrabold text-center text-white">
                    Create a report in less than a minute, with your content!
                  </p>
                  <div className="text-center text-xl text-white font-extrabold uppercase">
                    T<span className="underline underline-offset-8">ry no</span>
                    w!
                  </div>
                </div>
                <ButtonWhite2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
