import { forwardRef, Suspense, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Input } from "../../../components/Inputs";
import { SearchProps, useSearchBy } from "../../../utils/queries";

const SearchResults = ({
  searchIn,
  type,
  value,
  onUpdate,
}: {
  onUpdate: Function;
} & SearchProps) => {
  const { data } = useSearchBy({ searchIn, type, value });
  const intl = useIntl();

  return (
    <ul className="SearchResult">
      {data?.length > 0 ? (
        data
          ?.filter((element: any) => !data.includes(element.id))
          .map((element: any) => (
            <li
              key={element.id}
              onClick={() => {
                onUpdate(element);
              }}
              className="SearchResult__Item"
            >
              <span>{element.i18n.title}</span>
              <span className="SearchResult__Item__Ref">
                #{element.reference || element.id}
              </span>
            </li>
          ))
      ) : value && value.length > 1 ? (
        <li className="SearchResult__NoResults">
          <span>
            {intl.formatMessage({ id: "NO_RESULTS" })}{" "}
            {value && value.length > 0 ? (
              <span>
                {intl.formatMessage({ id: "FOR" })} "
                <span className="emphasize">{value}</span>"
              </span>
            ) : (
              ""
            )}
          </span>
        </li>
      ) : null}
    </ul>
  );
};

const Search = forwardRef(
  (
    {
      searchIn,
      setIsModalOpen,
      cursorIndex,
    }: {
      searchIn: SearchProps["searchIn"];
      setIsModalOpen: Function;
      cursorIndex: number;
    },
    ref: any
  ) => {
    const [searchByRef, setSearchByRef] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const intl = useIntl();

    useEffect(
      () => (query.startsWith("#") ? setSearchByRef(true) : setSearchByRef(false)),
      [query]
    );
    const type =
      searchIn === "product"
        ? searchByRef
          ? "reference"
          : "title"
        : searchByRef
        ? "id"
        : "title";

    const value = searchByRef ? query.substring(1) : query;

    return (
      <div className="Search__Content">
        <span className="Search__Content__Title">
          {intl.formatMessage({ id: "BlockText__TEXT_LINK_MODAL_TITLE" })}
        </span>
        <div className="Search__Content__Search">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder={intl.formatMessage({ id: "SEARCH_BY" })}
            id="Search-field"
            emphasize={searchByRef}
            type="text"
            icon={<i className="fa fa-search text-vermillon"></i>}
            iconAlignment="right"
            label={intl.formatMessage({ id: "SEARCH" })}
            info={intl.formatMessage({ id: "BlockText__SEARCH_INFO" })}
          />
          <Suspense
            fallback={
              <div className="Search__Loader">
                <i className="fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <SearchResults
              searchIn={searchIn}
              type={type}
              value={value}
              onUpdate={(content: any) => {
                ref.current.editor.insertText(
                  cursorIndex,
                  `[${searchIn}_link id=${content.id} title="${content.i18n.title}"]`
                );
                setIsModalOpen(false);
                ref.current.blur();
              }}
            />
          </Suspense>
        </div>
      </div>
    );
  }
);

export default Search;
