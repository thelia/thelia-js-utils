import { forwardRef } from "react";
import ReactQuill from "react-quill";

import "./Editor.css";

const EditorToolbar = ({ setIsModalOpen }: { setIsModalOpen: Function }) => {
  return (
    <div id="editor-toolbar">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <button className="ql-list" value="bullet" />
      <button className="ql-list" value="ordered" />
      <button className="ql-link" />
      <button className="search" onClick={() => setIsModalOpen(true)}>
        <i className="fas fa-plus"></i>
      </button>

      {/* <button className="product" onClick={() => setIsModalOpen(true)}>
        <i className="fas fa-box"></i>
      </button>
      <button className="content" onClick={() => setIsModalOpen(true)}>
        <i className="fas fa-file-alt"></i>
      </button>
      <button className="folder" onClick={() => setIsModalOpen(true)}>
        <i className="fas fa-folder-open"></i>
      </button>
      <button className="category" onClick={() => setIsModalOpen(true)}>
        <i className="fas fa-book"></i>
      </button> */}
    </div>
  );
};

const Editor = forwardRef(
  (
    {
      value,
      setValue,
      setIsModalOpen,
    }: {
      value: string;
      setValue: Function;
      setIsModalOpen: Function;
    },
    ref: any
  ) => {
    return (
      <>
        <EditorToolbar setIsModalOpen={setIsModalOpen} />
        <ReactQuill
          modules={{
            toolbar: {
              container: "#editor-toolbar",
            },
          }}
          ref={ref}
          value={value}
          placeholder="Votre texte ici"
          onChange={(value) => setValue(value)}
        />
      </>
    );
  }
);

export default Editor;
