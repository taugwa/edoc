import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ToolbarMain = ({ value, onChange }) => {
  const editorRef = useRef();

  const handleEditorChange = (content) => {
    onChange(content);
  };

  const handleFontChange = (e) => {
    const font = e.target.value;
    editorRef.current.getEditor().format('font', font);
  };

  const fonts = [
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
  ];

  const toolbarOptions = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ font: fonts.map((font) => font.value) }], 
        ['link', 'image', 'video'], 
      ],
    },
  };

  return (
    <div className="text-editor-toolbar">
      <ReactQuill
        ref={editorRef}
        value={value}
        onChange={handleEditorChange}
        modules={toolbarOptions}
      />
    </div>
  );
};

export default ToolbarMain;
