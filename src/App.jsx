import { useState, useEffect } from "react";
import Editor from "./Editor";
import Form from "./Form";
import Download from "./Download";

export default function App() {
  const [preloadedCode, setPreCode] = useState("");
  const [file, setFileName] = useState("");
  const [write, setWrite] = useState("");

  useEffect(() => {
    setWrite(preloadedCode);
  }, [preloadedCode]);

  const handleLinkSubmission = (codeOutput) => {
    setPreCode(codeOutput);
  };

  const handleFileChange = (writeToFile) => {
    setWrite(writeToFile);
  };

  const handleFileName = (name) => {
    setFileName(name);
  };

  useEffect(() => {}, [file]);

  return (
    <>
      <Form onLinkSubmit={handleLinkSubmission} setName={handleFileName}></Form>
      <div className="download-editor">
        <div className="editor-header-row">
          <div className="editor-header-row-text">-- Editor --</div>
          <div className="download-button-container">
            <Download fileData={write} fileName={file}></Download>
          </div>
        </div>
        <Editor
          preloadedCode={preloadedCode}
          exportChange={handleFileChange}
        ></Editor>
      </div>
    </>
  );
}
