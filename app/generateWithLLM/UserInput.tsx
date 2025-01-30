import React, { useState } from "react";
import Logo3 from "../Components/Images/Logo3";
import Navbar from "../Components/Navbar";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Logo1 from "../Components/Images/Logo1";
import Logo2 from "../Components/Images/Logo2";

const GENERATE_REPORT = gql`
  mutation generateReport($prompt: String!) {
    CreateReportWithLLM(prompt: $prompt)
  }
`;
function UserInput() {
  const [getReport, { loading, error }] = useMutation(GENERATE_REPORT);
  const [errorMSG, setErrorMSG] = useState("");
  const router = useRouter();
  const [userPrompt, setUserPrompt] = useState("");
  const [content, setContent] = useState("");
  async function retrievePDF() {
    try {
      let prompt = userPrompt;
      if (content.length > 0) {
        prompt = `${prompt}\ncontent:${content}`;
      }
      const data: any = await getReport({
        variables: { prompt },
      });

      if (
        JSON.parse(data.data.CreateReportWithLLM) === "Error generating report"
      ) {
        setErrorMSG("Gemini servers are busy");
        throw new Error("Gemini Servers Are Busy");
      }
      localStorage.setItem("pages", JSON.parse(data.data.CreateReportWithLLM));
      router.push("/documents/reportgen/0");
    } catch (e) {
      console.error("Error occured", e);
    }
  }
  function saveCurrentPage() {}
  return (
    <div className="flex gap-4 flex-col bg-[#040e18]">
      <div className=" py-2 bg-[#01162B] flex items-center justify-between px-8">
        <Logo2 />
        <Navbar />
      </div>

      <div className="flex-1 mb-4 flex justify-center items-center">
        <div className="bg-[#01162B] p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-center text-white">
            Create Your Report
          </h2>

          {/* Form Container */}
          {/* Topic Input */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-white"
            >
              Report Topic*
            </label>
            <input
              id="topic"
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
              name="topic"
              type="text"
              required
              placeholder="Enter the report topic"
              className="block w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01162B] focus:border-transparent"
            />
          </div>

          {/* Report Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-white"
            >
              Report Content (Optional)
            </label>
            <textarea
              id="content"
              name="content"
              required
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Enter the details of your report"
              rows={6}
              className="block w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01162B] focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-2  justify-center">
            {!loading ? (
              <button
                onClick={() => {
                  retrievePDF();
                }}
                className="w-full sm:w-auto border px-4 py-2 rounded-2xl text-white"
              >
                Submit report
              </button>
            ) : (
              <>
                <text className="text-white font-bold">
                  Generating... please sit back.
                </text>
                <ClipLoader
                  color={"#ffffff"}
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            )}

            {errorMSG && <div className="text-center text-red-500 font-extrabold">{errorMSG} :\</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInput;
