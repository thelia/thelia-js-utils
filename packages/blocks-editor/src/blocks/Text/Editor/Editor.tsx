import Tippy from "@tippyjs/react";
import { forwardRef, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import ReactQuill, { Quill } from "react-quill";
import { ReactComponent as LinkIcon } from "../../../../assets/svg/link.svg";
import { EditorModule } from "../../../utils/types";

import "./Editor.css";

const EditorToolbar = ({
  setIsModalOpen,
  toolbarId,
}: {
  setIsModalOpen: Function;
  toolbarId: string;
}) => {
  const intl = useIntl();

  const editorModules: EditorModule[] = [
    { name: "bold", tooltip: intl.formatMessage({ id: "BOLD" }) },
    { name: "italic", tooltip: intl.formatMessage({ id: "ITALIC" }) },
    { name: "underline", tooltip: intl.formatMessage({ id: "UNDERLINE" }) },
    {
      name: "align",
      value: "",
      tooltip: intl.formatMessage({ id: "ALIGN_LEFT" }),
    },
    {
      name: "align",
      value: "center",
      tooltip: intl.formatMessage({ id: "ALIGN_CENTER" }),
    },
    {
      name: "align",
      value: "right",
      tooltip: intl.formatMessage({ id: "ALIGN_RIGHT" }),
    },
    {
      name: "list",
      value: "ordered",
      tooltip: intl.formatMessage({ id: "ORDERED_LIST" }),
    },
    {
      name: "list",
      value: "bullet",
      tooltip: intl.formatMessage({ id: "UNORDERED_LIST" }),
    },
  ];

  return (
    <div id={toolbarId} style={{ marginTop: "10px" }}>
      {editorModules.map((module, index) => (
        <Tippy delay={[500, 0]} content={module.tooltip} key={index}>
          <button className={`ql-${module.name}`} value={module.value} />
        </Tippy>
      ))}
      <Tippy delay={[500, 0]} content={intl.formatMessage({ id: "INSERT_LINK" })}>
        <button className="search" onClick={() => setIsModalOpen(true)}>
          <LinkIcon style={{ display: "block" }} />
        </button>
      </Tippy>
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

    const modules = useMemo(() => {
      return { toolbar: { container: `#${toolbarId}` } };
    }, []);

    return (
      <>
        <EditorToolbar setIsModalOpen={setIsModalOpen} toolbarId={toolbarId} />
        <ReactQuill
          modules={modules}
          ref={ref}
          value={value}
          placeholder={intl.formatMessage({
            id: "BlockText__TEXT_PLACEHOLDER",
          })}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </>
    );
  }
);

export default Editor;
