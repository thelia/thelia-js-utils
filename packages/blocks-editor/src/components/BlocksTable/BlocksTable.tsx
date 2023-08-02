import { useContext, useEffect, useState } from "react";
import useCopyToClipboard from "react-use/esm/useCopyToClipboard";
import { GroupItem } from "../../utils/types";
import {
  useDeleteGroup,
  useDuplicateGroup,
  useGroups,
} from "../../utils/queries";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as CopyIcon } from "../../../assets/svg/copy.svg";
import { ReactComponent as CodeIcon } from "../../../assets/svg/code.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import { ReactComponent as ArrowIcon } from "../../../assets/svg/select-arrow.svg";
import toast from "react-hot-toast";
import Tippy from "@tippyjs/react";
import Modal from "../Modal";
import ItemBlockGroupTable from "../ItemBlockGroupTable";
import { useIntl } from "react-intl";

import "./BlocksTable.css";
import { LocaleContext } from "../../providers/LocaleContext";
import dayjs from "dayjs";

const BlocksTableRow = ({
  group,
  getUrlWithPrefix,
}: {
  group: GroupItem;
  getUrlWithPrefix: Function;
}) => {
  const intl = useIntl();
  const { locales = [] } = group;
  const [copied, copyToClipboard] = useCopyToClipboard();
  const mutationDelete = useDeleteGroup();
  const mutationDuplicate = useDuplicateGroup();

  const [linkedContents, setLinkedContents] = useState<
    GroupItem["itemBlockGroups"]
  >([]);
  const [isItemBlockModalOpen, setIsItemBlockModalOpen] = useState(false);

  return (
    <tr className="BlocksTable__Row" key={group.id}>
      <td className="BlocksTable__Row__Id">#{group.id}</td>
      <td className="BlocksTable__Row__Title">
        <a href={getUrlWithPrefix(`/admin/TheliaBlocks/${group.id}`)}>
          {group.title || intl.formatMessage({ id: "NO_TITLE" })}
        </a>
      </td>
      <td className="BlocksTable__Row__Id">
        {dayjs(group.updatedAt ?? group.createdAt).format("DD/MM/YYYY")}
      </td>
      <td className="BlocksTable__Row__LinkedContent">
        <div
          className={`BlocksTable__Row__LinkedContent__Wrapper ${
            group?.itemBlockGroups?.length && group.itemBlockGroups.length > 0
              ? "BlocksTable__Row__LinkedContent__Wrapper--asLink"
              : ""
          }`}
        >
          {group.itemBlockGroups?.length &&
          group.itemBlockGroups?.length > 0 ? (
            <>
              <button
                onClick={() => {
                  setIsItemBlockModalOpen(true);
                  setLinkedContents(group.itemBlockGroups);
                }}
              >
                {group.itemBlockGroups?.length}{" "}
                {intl.formatMessage({ id: "LINKED_CONTENTS" })}
              </button>
              <i className="fas fa-link"></i>
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
            <ItemBlockGroupTable
              setIsItemBlockModalOpen={setIsItemBlockModalOpen}
              linkedContents={linkedContents}
            />
          </Modal>
        </div>
      </td>
      <td className="BlocksTable__Row__Locales">
        <div className="BlocksTable__Row__Locales__Wrapper">
          {locales.length > 3 ? (
            <>
              {locales.slice(0, 2).map((locale) => (
                <span className="Locale" key={locale}>
                  {locale.substring(0, 2)}
                </span>
              ))}
              <span>
                + {locales.slice(2).length}{" "}
                {intl.formatMessage({ id: "OTHER" })}
                {locales.slice(2).length > 1 ? "s" : ""}
              </span>
            </>
          ) : (
            locales.map((locale) => (
              <span className="Locale" key={locale}>
                {locale.substring(0, 2)}
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
            <a
              className="BlocksTable__Row__Action"
              href={getUrlWithPrefix(`/admin/TheliaBlocks/${group.id}`)}
            >
              <EditIcon />
            </a>
          </Tippy>
          <Tippy
            delay={[500, 0]}
            content={intl.formatMessage({ id: "DUPLICATE_BLOCK" })}
          >
            <button
              className="BlocksTable__Row__Action"
              onClick={() => {
                mutationDuplicate.mutate(group.id);
              }}
            >
              {mutationDuplicate.isLoading ? (
                <i className="block fa fa-circle-notch fa-spin"></i>
              ) : (
                <CopyIcon />
              )}
            </button>
          </Tippy>
          <Tippy
            delay={[500, 0]}
            content={intl.formatMessage({ id: "COPY_SHORTCODE" })}
          >
            <button
              className="BlocksTable__Row__Action"
              onClick={() => {
                const shortcode = `[block_group slug=${group.slug}]`;
                copyToClipboard(shortcode);

                copied.error
                  ? toast.error(intl.formatMessage({ id: "COPY_ERROR" }))
                  : toast.success(
                      `${shortcode} ${intl.formatMessage({
                        id: "COPY_SUCCESS",
                      })}`
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
              className="BlocksTable__Row__Action__Delete"
              onClick={() => {
                mutationDelete.mutate(group.id);
              }}
            >
              {mutationDelete.isLoading ? (
                <i className="block fa fa-circle-notch fa-spin"></i>
              ) : (
                <DeleteIcon />
              )}
            </button>
          </Tippy>
        </div>
      </td>
    </tr>
  );
};

const BlocksTable = ({ searchQuery: title }: { searchQuery?: string }) => {
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { getUrlWithPrefix } = useContext(LocaleContext);
  const [order, setOrder] = useState("id_reverse");
  const intl = useIntl();

  const { data, isError, isFetching } = useGroups({ limit, offset, title, order });

  useEffect(() => {
    setOffset(0);
  }, [title]);

  const { items: groups = [], pagination_info: pagination } = data || {};

  const sortGroups = (main: string, reverse: string) => {
    setOrder((prev) =>prev === reverse? main: reverse);
    setOffset(0)
  }

  if (groups.length <= 0) {
    return (
      <div>{intl.formatMessage({ id: "BlocksList__NO_THELIA_BLOCKS" })}</div>
    );
  }

  if (isError) {
    return (
      <div>
        {intl.formatMessage({ id: "BlocksList__ERROR_LOADING_THELIA_BLOCKS" })}
      </div>
    );
  }

  return (
    <>
      <table
        className={`BlocksTable ${
          isFetching ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <thead className="BlocksTable__Header">
          <tr>
            <th scope="col">{intl.formatMessage({ id: "ID" })}</th>
            <th scope="col">
              <button
                type="button"
                onClick={() =>
                  sortGroups('title','title_reverse')
                }
                className="BlocksTable__Sort"
              >
                {intl.formatMessage({ id: "NAME" })}
                <ArrowIcon
                  className={
                    order === "title"
                      ? "transform origin-center rotate-180"
                      : ""
                  }
                />
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                onClick={() =>
                  sortGroups('updated_at','updated_at_reverse')
                }
                className="BlocksTable__Sort"
              >
                {intl.formatMessage({ id: "UPDATED_DATE" })}
                <ArrowIcon
                  className={
                    order === "updated_at"
                      ? "transform origin-center rotate-180"
                      : ""
                  }
                />
              </button>
            </th>
            <th scope="col">{intl.formatMessage({ id: "LINKED_CONTENTS" })}</th>
            <th scope="col">
              {intl.formatMessage({ id: "AVAILABLE_LOCALES" })}
            </th>
            <th scope="col">{intl.formatMessage({ id: "ACTIONS" })}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group: GroupItem) => (
            <BlocksTableRow
              group={group}
              key={group.id}
              getUrlWithPrefix={getUrlWithPrefix}
            />
          ))}
        </tbody>
      </table>
      {pagination && pagination.nbPages !== 1 && (
        <div className="Pagination">
          {pagination.currentPage !== 1 && (
            <button
              className="Pagination__Button Pagination__Button--previous"
              onClick={() => setOffset(0)}
              disabled={offset === 0}
            >
              <i className="fa fa-chevron-left"></i>
            </button>
          )}
          {pagination.currentPage - 1 >= 1 && (
            <button
              className="Pagination__Button Pagination__Button--page "
              onClick={() =>
                setOffset(() =>
                  Math.max(limit * (pagination.currentPage - 2), 0)
                )
              }
            >
              {pagination.currentPage - 1}
            </button>
          )}
          <div className="Pagination__Button Pagination__Button--page font-bold">
            {pagination.currentPage}
          </div>
          {pagination.currentPage + 1 <= pagination.nbPages && (
            <button
              className="Pagination__Button Pagination__Button--page "
              onClick={() =>
                setOffset(() => Math.max(limit * pagination.currentPage, 0))
              }
            >
              {pagination.currentPage + 1}
            </button>
          )}
          {pagination.currentPage !== pagination.nbPages && (
            <button
              className="Pagination__Button Pagination__Button--next"
              onClick={() =>
                setOffset(() => Math.max(limit * (pagination.nbPages - 1), 0))
              }
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default BlocksTable;
