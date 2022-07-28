import Tippy from "@tippyjs/react";
import { GroupTypeResponse } from "../../types/types";
import { itemBlockGroupsType } from "../../types/types";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { useDeleteItemBlockGroup } from "../../utils/queries";
import { useIntl } from "react-intl";

const LinkedContentTable = ({
  linkedContents,
}: {
  linkedContents: GroupTypeResponse["itemBlockGroups"];
}) => {
  const mutationDelete = useDeleteItemBlockGroup();
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
                    content={intl.formatMessage({ id: "ACCESS_CONTENT" })}
                  >
                    <a href={content.itemUrl}>
                      <i className="fas fa-eye"></i>
                    </a>
                  </Tippy>
                  <Tippy
                    delay={[500, 0]}
                    content={intl.formatMessage({ id: "DELETE_LINKED_CONTENT" })}
                  >
                    <button
                      onClick={() => {
                        mutationDelete.mutate(content.groupId);
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
