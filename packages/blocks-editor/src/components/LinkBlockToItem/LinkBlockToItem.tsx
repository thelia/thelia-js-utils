import { useGroups, useLinkContentToGroup } from "../../utils/queries";
import { Suspense, useRef, useState } from "react";
import { GroupTypeStore } from "../../utils/types";
import slugify from "../../utils/slugify";
import { useIntl } from "react-intl";
import { Input } from "../Inputs";
import { ReactComponent as LinkIcon } from "../../../assets/svg/link.svg";

import "./LinkBlockToItem.css";

interface ILinkBlockToItemprops {
  apiUrl: string;
  groupId?: number;
  itemId?: number;
  itemType?: string;
}

function List({
  search,
  onClickGroup,
}: {
  search: string;
  onClickGroup: (group: GroupTypeStore) => void;
}) {
  const intl = useIntl();
  const {
    data,
  }: {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: any;
  } = useGroups();

  const results = data.filter(
    ({ slug }: { slug: GroupTypeStore["slug"] }) =>
      slug?.search(new RegExp(slugify(search), "i")) !== -1
  );

  return (
    <ul className="SearchResult">
      {results.length > 0 ? (
        results.map((group: GroupTypeStore) => (
          <li
            key={group.id}
            className="SearchResult__Item"
            onClick={() => onClickGroup(group)}
          >
            <span>
              #{group.id} - {group.title || intl.formatMessage({ id: "NO_TITLE" })}
            </span>
          </li>
        ))
      ) : search && search.length > 1 ? (
        <li className="SearchResult__NoResults">
          <span>
            {intl.formatMessage({ id: "NO_RESULTS" })}{" "}
            {search && search.length > 0 ? (
              <span>
                {intl.formatMessage({ id: "FOR" })} "
                <span className="emphasize">{search}</span>"
              </span>
            ) : (
              ""
            )}
          </span>
        </li>
      ) : null}
    </ul>
  );
}

function BlockSelector({ itemId, itemType }: Omit<ILinkBlockToItemprops, "apiUrl">) {
  const [search, setSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<GroupTypeStore>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  /* const [showWarning, setShowWarning] = useState<boolean>(false); */

  const intl = useIntl();

  const mutation = useLinkContentToGroup();
  const selectRef = useRef(null);

  const onClickGroup = (group: GroupTypeStore) => {
    setSearch(group.title || "");
    setSelectedGroup(group);
    setShowSuggestions(false);
    /* setShowWarning(true); */
  };

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
