import { useState } from "react";
import Editor from "./Editor";
import Form from "./Form";
import Download from "./Download";

export default function App() {
  const [preloadedCode, setPreCode] = useState("");
  let write = "";

  const handleLinkSubmission = (codeOutput) => {
    setPreCode(codeOutput);
  };

  const handleFileChange = (writeToFile) => {
    write = writeToFile;
  };

  return (
    <>
      <Form onLinkSubmit={handleLinkSubmission}></Form>
      <Download fileData={write}></Download>
      <Editor
        preloadedCode={preloadedCode}
        exportChange={handleFileChange}
      ></Editor>
    </>
  );
}
