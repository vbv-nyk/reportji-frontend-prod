import React, { useState } from "react";
import Logo3 from "../Components/Images/Logo3";
import Navbar from "../Components/Navbar";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const GENERATE_REPORT = gql`
  mutation generateReport($prompt: String!) {
    CreateReportWithLLM(prompt: $prompt)
  }
`;
function UserInput() {
  const [getReport, { loading, error }] = useMutation(GENERATE_REPORT);
  const router = useRouter();
  const [userPrompt, setUserPrompt] = useState("");
  async function retrievePDF() {
    try {
      const data: any = await getReport({
        variables: { prompt: userPrompt },
      });
      localStorage.setItem("pages", JSON.parse(data.data.CreateReportWithLLM));
      router.push("/documents/reportgen/0");
    } catch (e) {
      console.error("Error occured", e);
    }
  }
  function saveCurrentPage() {}
  return (
    <div className="h-screen flex flex-col bg-[#040e18]">
      <div className="h-[15%] bg-[#01162B] flex items-center justify-between px-8">
        <Logo3 />
        <Navbar />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-[#01162B] p-8 rounded-lg shadow-lg w-full max-w-4xl">
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
              className="mt-2 block w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01162B] focus:border-transparent"
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
              placeholder="Enter the details of your report"
              rows={6}
              className="mt-2 block w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01162B] focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
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
              <text className="text-white font-bold">
                Generating... please sit back.
              </text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInput;
