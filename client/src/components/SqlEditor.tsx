import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-min-noconflict/ext-language_tools";

type SqlEditorProps = {
    theQuery : string;
    onTextChange : (change:string) =>void;
}

const SqlEditor = (props: SqlEditorProps) => {
  return (
    <AceEditor
      aria-label="editor"
      mode="mysql"
      theme="sqlserver"
      name="editor"
      width="100%"
      fontSize={18}
      minLines={15}
      maxLines={10}
      placeholder="Write your query here..."
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
      value={props.theQuery}
      onChange={(e)=>{
        props.onTextChange(e);
      }}
    />
  );
};

export default SqlEditor;
