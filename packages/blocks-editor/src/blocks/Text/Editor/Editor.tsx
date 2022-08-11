import { forwardRef, useState } from "react";
import { useIntl } from "react-intl";
import ReactQuill, { Quill } from "react-quill";
import { ReactComponent as LinkIcon } from "../../../../assets/svg/link.svg";

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
      <button className="search" onClick={() => setIsModalOpen(true)}>
        <LinkIcon style={{ display: "block" }} />
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
    }: {
      value: string;
      setValue: Function;
      setIsModalOpen: Function;
    },
    ref: any
  ) => {
    const icons = Quill.import("ui/icons");

    icons["bold"] = '<i class="fas fa-bold"></i>';
    icons["italic"] = '<i class="fas fa-italic"></i>';
    icons["underline"] = '<i class="fas fa-underline"></i>';
    icons["align"][""] = '<i class="fas fa-align-left"></i>';
    icons["align"]["center"] = '<i class="fas fa-align-center"></i>';
    icons["align"]["right"] = '<i class="fas fa-align-right"></i>';
    icons["list"]["bullet"] = '<i class="fas fa-list"></i>';
    icons["list"]["ordered"] = '<i class="fas fa-list-ol"></i>';

    const intl = useIntl();
    const [toolbarId] = useState(
      `editor-toolbar-${Math.random().toString(36).substring(7)}`
    );

    return (
      <>
        <EditorToolbar setIsModalOpen={setIsModalOpen} toolbarId={toolbarId} />
        <ReactQuill
          modules={{ toolbar: { container: `#${toolbarId}` } }}
          ref={ref}
          value={value}
          placeholder={intl.formatMessage({ id: "BlockText__TEXT_PLACEHOLDER" })}
          onChange={(value) => setValue(value)}
        />
      </>
    );
  }
);

export default Editor;
