import Tippy from "@tippyjs/react";
import { GroupTypeResponse } from "../../types/types";
import { itemBlockGroupsType } from "../../types/types";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { useDeleteItemBlockGroup } from "../../utils/queries";

const LinkedContentTable = ({
  linkedContents,
}: {
  linkedContents: GroupTypeResponse["itemBlockGroups"];
}) => {
  const mutationDelete = useDeleteItemBlockGroup();

  return (
    <table className="BlocksTable">
      <thead className="BlocksTable__Header">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Titre</th>
          <th scope="col">Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {linkedContents?.map((content: itemBlockGroupsType) => {
          return (
            <tr className="BlocksTable__Row" key={content.itemId}>
              <td className="BlocksTable__Row__Id">#{content.itemId}</td>
              <td className="BlocksTable__Row__Title">
                <a href={content.itemUrl}>{content.itemTitle || "No Title"}</a>
              </td>
              <td className="BlocksTable__Row__Type">{content.itemType}</td>
              <td className="BlocksTable__Row__Actions">
                <div className="BlocksTable__Row__Actions__Wrapper">
                  <Tippy delay={[500, 0]} content="Accéder à ce contenu">
                    <a href={content.itemUrl}>
                      <i className="fas fa-eye"></i>
                    </a>
                  </Tippy>
                  <Tippy delay={[500, 0]} content="Supprimer ce contenu lié">
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
