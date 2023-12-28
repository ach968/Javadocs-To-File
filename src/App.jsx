import { useState, useEffect } from "react";
import Editor from "./Editor";
import Form from "./Form";
import Download from "./Download";
import ClearButton from "./ClearButton";

export default function App() {
  const [preloadedCode, setPreCode] = useState("");
  const [file, setFileName] = useState("");
  const [write, setWrite] = useState("");
  const [code, setCode] = useState(preloadedCode);

  useEffect(() => {
    setCode(preloadedCode);
  }, [preloadedCode]);

  useEffect(() => {
    setWrite(preloadedCode);
  }, [preloadedCode]);

  useEffect(() => {}, [file]);

  const handleLinkSubmission = (codeOutput) => {
    setPreCode(codeOutput);
  };

  const handleFileChange = (writeToFile) => {
    setWrite(writeToFile);
  };

  const handleFileName = (name) => {
    setFileName(name);
  };

  const handleEditorChange = (newCode) => {
    setCode(newCode);
    handleFileChange(code);
  };

  return (
    <>
      <Form onLinkSubmit={handleLinkSubmission} setName={handleFileName}></Form>
      <div className="download-editor">
        <div className="editor-header-row">
          <div className="editor-header-row-text">-- Editor --</div>
          <ClearButton onClick={handleEditorChange}></ClearButton>
          <Download fileData={write} fileName={file}></Download>
        </div>
        <Editor handleEditorChange={handleEditorChange} code={code}></Editor>
      </div>
    </>
  );
}
