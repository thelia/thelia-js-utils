import Tippy from "@tippyjs/react";
import { GroupTypeResponse } from "../../types/types";
import { itemBlockGroupsType } from "../../types/types";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import { ReactComponent as ViewIcon } from "../../../assets/svg/view.svg";

import { useUnlinkContentFromGroup } from "../../utils/queries";
import { useIntl } from "react-intl";
import { getContentUrl } from "../../utils/content-url";

const LinkedContentTable = ({
  linkedContents,
  setIsItemBlockModalOpen,
}: {
  linkedContents: GroupTypeResponse["itemBlockGroups"];
  setIsItemBlockModalOpen: Function;
}) => {
  const mutationDelete = useUnlinkContentFromGroup();
  const intl = useIntl();

  return (
    <table className="BlocksTable">
      <thead className="BlocksTable__Header">
        <tr>
          <th scope="col">{intl.formatMessage({ id: "ID" })}</th>
          <th scope="col">{intl.formatMessage({ id: "TITLE" })}</th>
          <th scope="col">{intl.formatMessage({ id: "TYPE" })}</th>
          <th scope="col">{intl.formatMessage({ id: "ACTIONS" })}</th>
        </tr>
      </thead>
      <tbody>
        {linkedContents?.map((content: itemBlockGroupsType) => {
          return (
            <tr className="BlocksTable__Row" key={content.itemId}>
              <td className="BlocksTable__Row__Id">#{content.itemId}</td>
              <td className="BlocksTable__Row__Title">
                <a href={content.itemUrl}>
                  {content.itemTitle || intl.formatMessage({ id: "NO_TITLE" })}
                </a>
              </td>
              <td className="BlocksTable__Row__Type">{content.itemType}</td>
              <td className="BlocksTable__Row__Actions">
                <div className="BlocksTable__Row__Actions__Wrapper">
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "ACCESS_LINKED_CONTENT" })}
                  >
                    <a className="BlocksTable__Row__Action" href={content.itemUrl}>
                      <ViewIcon />
                    </a>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "EDIT_LINKED_CONTENT" })}
                  >
                    <a
                      className="BlocksTable__Row__Action"
                      href={`${getContentUrl(
                        content.itemType as string,
                        content.itemId as number
                      )}`}
                    >
                      <EditIcon />
                    </a>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "DELETE_LINKED_CONTENT" })}
                  >
                    <button
                      className="BlocksTable__Row__Action__Delete"
                      onClick={() => {
                        mutationDelete.mutate(
                          { id: content.id },
                          {
                            onSuccess: () => {
                              setIsItemBlockModalOpen(false);
                            },
                          }
                        );
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

export default LinkedContentTable;
