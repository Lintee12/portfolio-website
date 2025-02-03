import { useEffect, useState } from "react";
import { MetaFunction } from "@remix-run/node";
import { BiDownload } from "react-icons/bi";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "My Documents" },
    { name: "description", content: "Welcome to my portfolio website!" },
  ];
};

const documents = [
  { id: 1, name: "My Resume", file: "/Evan-Linton-Resume.pdf" },
  { id: 2, name: "NBCC Transcript", file: "/Evan-Linton-NBCC-Transcript-1.pdf" },
];

function Documents() {
  const handleDownload = (filePath: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop() || "document";
    link.click();
  };

  return (
    <div className="p-4 mt-20 w-full min-h-screen bg-white  container mx-auto flex flex-col max-w-screen-md">
      <h1 className="text-3xl font-semibold mb-6">My Documents</h1>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            title="view"
            onClick={() => {
              window.location.href = doc.file;
            }}
            className="group cursor-pointer flex items-center justify-between p-4 bg-white rounded border hover:bg-gray-100 transition duration-200"
          >
            <span className="text-xl font-medium group-hover:underline">{doc.name}</span>
            <button
              title="download"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(doc.file);
              }}
              className="w-10 h-10"
            >
              <BiDownload className="min-w-full min-h-full text-zinc-700 hover:text-indigo-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Documents;
