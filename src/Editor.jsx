import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/ext-language_tools";
import React from "react";

export default function Editor({ handleEditorChange, code }) {
  const handleChange = (newCode) => {
    handleEditorChange(newCode);
  };

  return (
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
      width="100%"
      height="550px"
    />
  );
}
