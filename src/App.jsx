import { useState } from "react";
import Editor from "./Editor";
import Form from "./Form";

export default function App() {
  const [preloadedCode, setPreCode] = useState("");

  const handleLinkSubmission = (codeOutput) => {
    setPreCode(codeOutput);
  };

  return (
    <>
      <Form onLinkSubmit={handleLinkSubmission}></Form>
      <Editor preloadedCode={preloadedCode}></Editor>
    </>
  );
}
