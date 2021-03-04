import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MyCKEditor = ({ value, handleEdit, placeholder = "" }) => {
  return (
    <div style={{ color: "initial" }}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: placeholder,
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          },

          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
          language: "es",
        }}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
          editor.data.set(value);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          handleEdit(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};

export default MyCKEditor;
