import { useGroups, useInfiniteGroups, useLinkContentToGroup } from "../../utils/queries";
import { Fragment, Suspense, useRef, useState } from "react";
import { GroupTypeResponse, GroupTypeStore } from "../../utils/types";
import { useIntl } from "react-intl";
import { Input } from "../Inputs";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";
import { useClickAway } from "react-use";

import "./LinkBlockToItem.css";

interface ILinkBlockToItemprops {
  apiUrl: string;
  groupId?: number;
  itemId?: number;
  itemType?: string;
}

const List = ({
  search,
  onClickGroup,
}: {
  search: string;
  onClickGroup: (group: GroupTypeStore) => void;
}) => {
  const intl = useIntl();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteGroups({
    search: search && search.length > 3 ? search : undefined,
  });

  return (
    <ul className="SearchResult">
      {status === "loading" ? (
        <i className="fa fa-circle-notch fa-spin"></i>
      ) : status === "error" ? (
        <div>Une erreur est survenue</div>
      ) : (
        <>
          {infiniteData?.pages.map((groups: GroupTypeResponse[], index: number) => (
            <Fragment key={index}>
              {groups.map((group, index: number) => (
                <li
                  className="SearchResult__Item"
                  key={index}
                  onClick={() => onClickGroup(group)}
                >
                  #{group.id} - {group.title || intl.formatMessage({ id: "NO_TITLE" })}
                </li>
              ))}
            </Fragment>
          ))}
          <div className="text-center py-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <i className="fa fa-circle-notch fa-spin"></i>
              ) : hasNextPage ? (
                <span>Voir plus</span>
              ) : (
                <span>Pas de résultats supplémentaires</span>
              )}
            </button>
          </div>
        </>
      )}
    </ul>
  );
};

function BlockSelector({ itemId, itemType }: Omit<ILinkBlockToItemprops, "apiUrl">) {
  const [search, setSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<GroupTypeStore>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const selectRef = useRef(null);

  const intl = useIntl();

  const mutation = useLinkContentToGroup();

  const onClickGroup = (group: GroupTypeStore) => {
    setSearch(group.title || "");
    setSelectedGroup(group);
    setShowSuggestions(false);
  };

  useClickAway(selectRef, () => {
    setShowSuggestions(false);
  });

  return (
    <div className="GroupLink__Wrapper">
      <div className="GroupLink__Input__Wrapper">
        <div
          className="LinkBlockToItem-select"
          style={{ position: "relative", width: "100%" }}
          ref={selectRef}
        >
          <Input
            id="link-block-to-item"
            label={intl.formatMessage({ id: "LinkBlockToItem__LINK_GROUP" })}
            placeholder={intl.formatMessage({
              id: "LinkBlockToItem__LINK_GROUP_PLACEHOLDER",
            })}
            type="text"
            value={search}
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            onChange={(event) => {
              setSearch(event.target.value);
              setSelectedGroup(undefined);
            }}
          />
          <Suspense
            fallback={
              <div className="GroupLink__GroupList__Loader">
                <i className="Loader fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            {showSuggestions && <List search={search} onClickGroup={onClickGroup} />}
          </Suspense>
        </div>

        {selectedGroup ? (
          <button
            className="GroupLink__LinkButton"
            onClick={() =>
              selectedGroup && mutation.mutate({ id: selectedGroup.id, itemId, itemType })
            }
          >
            {mutation.isLoading ? (
              <i className="fa fa-circle-notch fa-spin"></i>
            ) : (
              <>
                <LinkIcon />
                {intl.formatMessage({ id: "LINK" })}
              </>
            )}
          </button>
        ) : null}
      </div>

      {/* <Modal
        isOpen={showWarning}
        setIsOpen={setShowWarning}
        title={intl.formatMessage({ id: "LinkBlockToItem__LINK_GROUP" })}
      >
        <p>

        </p>
      </Modal> */}
    </div>
  );
}

const LinkBlockToItem = ({
  groupId,
  itemId,
  itemType,
}: Partial<ILinkBlockToItemprops>) => {
  return <BlockSelector groupId={groupId} itemId={itemId} itemType={itemType} />;
};

export default LinkBlockToItem;
