import { useState } from "react";
import Editor from "./Editor";
import Form from "./Form";
import Download from "./Download";

export default function App() {
  const [preloadedCode, setPreCode] = useState("");

  const handleLinkSubmission = (codeOutput) => {
    setPreCode(codeOutput);
  };

  return (
    <>
      <Form onLinkSubmit={handleLinkSubmission}></Form>
      <Download></Download>
      <Editor preloadedCode={preloadedCode}></Editor>
    </>
  );
}
