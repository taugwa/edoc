import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ToolbarMain = ({ value, onChange }) => {
  const editorRef = useRef();

  const handleEditorChange = (content) => {
    onChange(content);
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div className="text-editor-toolbar">
      {formats.map((format) => (
        <button
          key={format}
          className="text-editor-toolbar-button"
          onClick={() => handleEditorChange(format)}
        >
          {format}
        </button>
      ))}
      <ReactQuill
        ref={editorRef}
        value={value}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default ToolbarMain;

