import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ToolbarMain = ({ value, onChange }) => {
  const editorRef = useRef();

  const handleEditorChange = (content) => {
    onChange(content);
  };


  const formats = [
  ];

  return (
    <div className="text-editor-toolbar">
      <div className="text-editor-toolbar-row">
        <div className="text-editor-toolbar-buttons">
        </div>
      </div>
      <ReactQuill 
      ref={editorRef} 
      value={value} 
      onChange={handleEditorChange}
       />
    </div>
  );
};

export default ToolbarMain;

