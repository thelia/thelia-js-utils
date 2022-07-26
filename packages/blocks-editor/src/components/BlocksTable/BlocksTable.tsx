import { useState } from "react";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";
import { GroupTypeResponse } from "../../types/types";
import { useDeleteGroup, useDuplicateGroup, useGroups } from "../../utils/queries";

import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as CopyIcon } from "../../../assets/svg/copy.svg";
import { ReactComponent as CodeIcon } from "../../../assets/svg/code.svg";
import toast from "react-hot-toast";

import "./BlocksTable.css";
import Tippy from "@tippyjs/react";
import Modal from "../Modal";
import ItemBlockGroupTable from "../ItemBlockGroupTable";

const BlocksTable = () => {
  const { data: groups = [], isError } = useGroups();

  const [linkedContents, setLinkedContents] = useState<
    GroupTypeResponse["itemBlockGroups"]
  >([]);
  const [isItemBlockModalOpen, setIsItemBlockModalOpen] = useState(false);

  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

  if (groups.length <= 0) {
    return <div>Vous n'avez pas encore créé de Thelia Blocks</div>;
  }

  if (isError) {
    return <div>Erreur lors de la récupération des Thelia Blocks</div>;
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
            <tr className="BlocksTable__Row" key={group.id}>
              <td className="BlocksTable__Row__Id">#{group.id}</td>
              <td className="BlocksTable__Row__Title">
                <a href={`/admin/TheliaBlocks/${group.id}`}>
                  {group.title || "No Title"}
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
                        {group.itemBlockGroups?.length} contenu(s) lié(s)
                      </button>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-link"></i>
                      <span>Aucun contenu lié</span>
                    </>
                  )}
                  <Modal
                    isOpen={isItemBlockModalOpen}
                    setIsOpen={setIsItemBlockModalOpen}
                    title="Liste des contenus liés"
                  >
                    <ItemBlockGroupTable linkedContents={linkedContents} />
                  </Modal>
                </div>
              </td>
              <td className="BlocksTable__Row__Locales">
                <div className="BlocksTable__Row__Locales__Wrapper">
                  {group.locales.length > 3 ? (
                    <>
                      {group.locales.splice(0, 2).map((locale) => (
                        <span key={locale}>{locale}</span>
                      ))}
                      <span onClick={() => setIsItemBlockModalOpen(true)}>
                        +{group.locales.length}
                      </span>
                    </>
                  ) : (
                    <>
                      {group.locales.map((locale) => (
                        <span key={locale}>{locale}</span>
                      ))}
                    </>
                  )}
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

                        copied.error
                          ? toast.error(
                              `Erreur lors de la copie : ${copied.error.message}`
                            )
                          : copied.value &&
                            toast.success(`${shortcode} copié avec succès`);
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
