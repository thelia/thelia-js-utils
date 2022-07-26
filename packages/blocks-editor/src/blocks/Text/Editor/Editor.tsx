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
    </div>
  );
};

const Editor = forwardRef(
  (
    {
      value,
      setValue,
      setIsModalOpen,
      onBlur,
    }: {
      value: string;
      setValue: Function;
      setIsModalOpen: Function;
      onBlur: () => void;
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
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default Editor;
