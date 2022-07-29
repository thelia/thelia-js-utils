import { useState } from "react";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";
import { GroupTypeResponse } from "../../types/types";
import { useDeleteGroup, useDuplicateGroup, useGroups } from "../../utils/queries";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as CopyIcon } from "../../../assets/svg/copy.svg";
import { ReactComponent as CodeIcon } from "../../../assets/svg/code.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import toast from "react-hot-toast";

import "./BlocksTable.css";
import Tippy from "@tippyjs/react";
import Modal from "../Modal";
import ItemBlockGroupTable from "../ItemBlockGroupTable";
import { useIntl } from "react-intl";

const BlocksTable = () => {
  const { data: groups = [], isError } = useGroups();
  const intl = useIntl();

  const [linkedContents, setLinkedContents] = useState<
    GroupTypeResponse["itemBlockGroups"]
  >([]);
  const [isItemBlockModalOpen, setIsItemBlockModalOpen] = useState(false);

  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

  if (groups.length <= 0) {
    return <div>{intl.formatMessage({ id: "BlocksList__NO_THELIA_BLOCKS" })}</div>;
  }

  if (isError) {
    return (
      <div>{intl.formatMessage({ id: "BlocksList__ERROR_LOADING_THELIA_BLOCKS" })}</div>
    );
  }

  return (
    <table className="BlocksTable">
      <thead className="BlocksTable__Header">
        <tr>
          <th scope="col">{intl.formatMessage({ id: "ID" })}</th>
          <th scope="col">{intl.formatMessage({ id: "NAME" })}</th>
          <th scope="col">{intl.formatMessage({ id: "LINKED_CONTENTS" })}</th>
          <th scope="col">{intl.formatMessage({ id: "AVAILABLE_LOCALES" })}</th>
          <th scope="col">{intl.formatMessage({ id: "ACTIONS" })}</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group: GroupTypeResponse) => {
          return (
            <tr className="BlocksTable__Row" key={group.id}>
              <td className="BlocksTable__Row__Id">#{group.id}</td>
              <td className="BlocksTable__Row__Title">
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || intl.formatMessage({ id: "NO_TITLE" })}
                </a>
              </td>
              <td className="BlocksTable__Row__LinkedContent">
                <div
                  className={`BlocksTable__Row__LinkedContent__Wrapper ${
                    group?.itemBlockGroups?.length && group.itemBlockGroups.length > 0
                      ? "BlocksTable__Row__LinkedContent__Wrapper--asLink"
                      : ""
                  }`}
                >
                  {group.itemBlockGroups?.length && group.itemBlockGroups?.length > 0 ? (
                    <>
                      <i className="fas fa-link"></i>
                      <button
                        onClick={() => {
                          setIsItemBlockModalOpen(true);
                          setLinkedContents(group.itemBlockGroups);
                        }}
                      >
                        {group.itemBlockGroups?.length}{" "}
                        {intl.formatMessage({ id: "LINKED_CONTENTS" })}
                      </button>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-link"></i>
                      <span>{intl.formatMessage({ id: "NO_LINKED_CONTENTS" })}</span>
                    </>
                  )}
                  <Modal
                    isOpen={isItemBlockModalOpen}
                    setIsOpen={setIsItemBlockModalOpen}
                    title={intl.formatMessage({ id: "LINKED_CONTENTS_LIST" })}
                  >
                    <ItemBlockGroupTable linkedContents={linkedContents} />
                  </Modal>
                </div>
              </td>
              <td className="BlocksTable__Row__Locales">
                <div className="BlocksTable__Row__Locales__Wrapper">
                  {group.locales.length > 3 ? (
                    <>
                      {group.locales.slice(0, 2).map((locale) => (
                        <span className="Locale" key={locale}>
                          {locale}
                        </span>
                      ))}
                      <span>
                        + {group.locales.slice(2).length}{" "}
                        {intl.formatMessage({ id: "OTHER" })}
                        {group.locales.slice(2).length > 1 ? "s" : ""}
                      </span>
                    </>
                  ) : (
                    group.locales.map((locale) => (
                      <span className="Locale" key={locale}>
                        {locale}
                      </span>
                    ))
                  )}
                </div>
              </td>
              <td className="BlocksTable__Row__Actions">
                <div className="BlocksTable__Row__Actions__Wrapper">
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "EDIT_BLOCK" })}
                  >
                    <a href={`/admin/TheliaBlocks/${group.id}`}>
                      <EditIcon />
                    </a>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "DUPLICATE_BLOCK" })}
                  >
                    <button
                      onClick={() => {
                        mutationDuplicate.mutate(group.id);
                      }}
                    >
                      <CopyIcon />
                    </button>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "COPY_SHORTCODE" })}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const shortcode = `[block_group slug=${group.slug}]`;
                        copyToClipboard(shortcode);

                        copied.error
                          ? toast.error(intl.formatMessage({ id: "COPY_ERROR" }))
                          : copied.value &&
                            toast.success(
                              `${shortcode} ${intl.formatMessage({ id: "COPY_SUCCESS" })}`
                            );
                      }}
                    >
                      <CodeIcon />
                    </button>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "DELETE_BLOCK" })}
                  >
                    <button
                      onClick={() => {
                        mutationDelete.mutate(group.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </Tippy>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BlocksTable;
