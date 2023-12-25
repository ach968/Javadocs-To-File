import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState, useEffect } from "react";
import React from "react";

export default function Editor({ preloadedCode, exportChange }) {
  const [code, setCode] = useState(preloadedCode);

  useEffect(() => {
    setCode(preloadedCode);
  }, [preloadedCode]);

  const handleChange = (newCode) => {
    setCode(newCode);
    exportChange(code);
  };

  return (
    <div className="editor-div">
      <AceEditor
        placeholder=""
        mode="java"
        theme="idle_fingers"
        name="aceEditor"
        onChange={handleChange}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
          showPrintMargin: false,
          fixedWidthGutter: true,
        }}
        className="editor"
        width="85%"
        height="600px"
      />
    </div>
  );
}
