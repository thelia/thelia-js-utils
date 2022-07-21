import { useState } from "react";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";
import { GroupTypeResponse } from "../../types/types";
import { useDeleteGroup, useDuplicateGroup } from "../../utils/queries";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as CopyIcon } from "../../../assets/svg/copy.svg";
import { ReactComponent as CodeIcon } from "../../../assets/svg/code.svg";
import toast from "react-hot-toast";

import "./BlocksTable.css";
import Tippy from "@tippyjs/react";

const BlocksTable = () => {
  /* const { data: groups = [] } = useGroups(); */
  const groups = [
    {
      id: 1,
      itemBlockGroups: [],
      jsonContent:
        '[{"id":"5m6VSxp7680Ha70TPwmGC","data":{"level":0,"text":"test"},"parent":null,"type":{"id":"blockTitle"}}]',
      slug: "test_1",
      title: "Nom de ce Thelia blocks",
      visible: true,
    },
    {
      id: 2,
      itemBlockGroups: [],
      jsonContent:
        '[{"id":"5m6VSxp7680Ha70TPwmGC","data":{"level":0,"text":"test"},"parent":null,"type":{"id":"blockTitle"}}]',
      slug: "test_2",
      title: "Super long ce titre de Thelia Blocks",
      visible: true,
    },
    {
      id: 3,
      itemBlockGroups: [],
      jsonContent:
        '[{"id":"5m6VSxp7680Ha70TPwmGC","data":{"level":0,"text":"test"},"parent":null,"type":{"id":"blockTitle"}}]',
      slug: "test_3",
      title: "test",
      visible: true,
    },
    {
      id: 4,
      itemBlockGroups: [],
      jsonContent:
        '[{"id":"5m6VSxp7680Ha70TPwmGC","data":{"level":0,"text":"test"},"parent":null,"type":{"id":"blockTitle"}}]',
      slug: "test_4",
      title: "dernier test",
      visible: true,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

  if (groups.length <= 0) {
    return <div>No blocks to display</div>;
  }

  return (
    <table className="BlocksTable">
      <thead className="BlocksTable__Header">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nom</th>
          <th scope="col">Contenus liés</th>
          <th scope="col">Langues disponibles</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group: GroupTypeResponse) => {
          return (
            <tr className="BlocksTable__Row">
              <td className="BlocksTable__Row__Id">#{group.id}</td>
              <td className="BlocksTable__Row__Title">
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || "No Title"}
                </a>
              </td>
              <td className="BlocksTable__Row__LinkedContent">
                <div className="BlocksTable__Row__LinkedContent__Wrapper">
                  <i className="fas fa-link"></i>
                  <button onClick={() => setIsOpen(true)}>12 contenus liés</button>
                </div>
                {/* <div className="flex gap-2 items-center">
                  {!!group.itemBlockGroups?.length && (
                    <span className="text-sm font-normal text-gray-400">
                      <i className="fa fa-link ml-1"></i>
                      {group.itemBlockGroups.map(({ itemId, itemType }) => {
                        if (itemId && itemType) {
                          return (
                            <a
                              href={getContentUrl(itemType, itemId)}
                              key={`${itemType}-${itemId}`}
                            >
                              {itemType}-{itemId}
                            </a>
                          );
                        } else {
                          return (
                            <span key={`${itemType}-${itemId}`}>
                              {itemType}-{itemId}
                            </span>
                          );
                        }
                      })}
                    </span>
                  )}
                </div> */}
              </td>
              <td className="BlocksTable__Row__Langs">
                <div className="BlocksTable__Row__Langs__Wrapper">
                  <span>Fr</span>
                  <span>En</span>
                  <span>De</span>
                </div>
              </td>
              <td className="BlocksTable__Row__Actions">
                <div className="BlocksTable__Row__Actions__Wrapper">
                  <Tippy delay={[500, 0]} content="Dupliquer ce Thelia Blocks">
                    <button
                      onClick={() => {
                        mutationDuplicate.mutate(group.id);
                      }}
                    >
                      <CopyIcon />
                    </button>
                  </Tippy>
                  <Tippy delay={[500, 0]} content="Copier le shortcode">
                    <button
                      type="button"
                      onClick={() => {
                        const shortcode = `[block_group slug=${group.slug}]`;
                        copyToClipboard(shortcode);
                        toast(`${shortcode} copié avec succès`);
                      }}
                    >
                      <CodeIcon />
                    </button>
                  </Tippy>
                  <Tippy delay={[500, 0]} content="Supprimer ce Thelia Blocks">
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
