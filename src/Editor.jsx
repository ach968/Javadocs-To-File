import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState, useEffect } from "react";
import React from "react";

export default function Editor({ preloadedCode }) {
  const [code, setCode] = useState(preloadedCode);

  useEffect(() => {
    setCode(preloadedCode);
  }, [preloadedCode]);

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <>
      <AceEditor
        mode="java"
        theme="github"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="400px"
        value={code}
        onChange={handleChange}
      />
      <button id="downloadButton">Download</button>
    </>
  );
}
