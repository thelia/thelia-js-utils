import { forwardRef, useState } from "react";
import { useIntl } from "react-intl";
import ReactQuill from "react-quill";

import "./Editor.css";

const EditorToolbar = ({
  setIsModalOpen,
  toolbarId,
}: {
  setIsModalOpen: Function;
  toolbarId: string;
}) => {
  return (
    <div id={toolbarId}>
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
        <i style={{ display: "block", color: "#444" }} className="fas fa-plus"></i>
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
    const intl = useIntl();

    const [toolbarId] = useState(
      `editor-toolbar-${Math.random().toString(36).substring(7)}`
    );

    return (
      <>
        <EditorToolbar setIsModalOpen={setIsModalOpen} toolbarId={toolbarId} />
        <ReactQuill
          modules={{
            toolbar: {
              container: `#${toolbarId}`,
            },
          }}
          ref={ref}
          value={value}
          placeholder={intl.formatMessage({ id: "BlockText__TEXT_PLACEHOLDER" })}
          onChange={(value) => setValue(value)}
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default Editor;
