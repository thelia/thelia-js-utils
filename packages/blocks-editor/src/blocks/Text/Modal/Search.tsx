import { forwardRef, Suspense, useEffect, useState } from "react";
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

  return (
    <ul className="ProductList">
      {data?.length > 0 ? (
        <>
          {data
            ?.filter((element: any) => !data.includes(element.id))
            .map((element: any) => (
              <li
                key={element.id}
                onClick={() => {
                  onUpdate(element);
                }}
                className="ProductList__Item"
              >
                <span>{element.i18n.title}</span>
                <span className="ProductList__Item__Ref">
                  #{element.reference || element.id}
                </span>
              </li>
            ))}
        </>
      ) : value && value.length > 1 ? (
        <li className="ProductList__NoResults">
          <span>
            Aucun résultat{" "}
            {value && value.length > 0 ? (
              <span>
                pour "<span className="highlighted">{value}</span>"
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
      <div className="BlockProduct__Content">
        <span className="BlockProduct__Content__Title">
          Sélectionnez un élément à insérer
        </span>
        <div className="BlockProduct__Content__Search">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Nom, référence, id ..."
            id="BlockProduct-field-product"
            type="text"
            icon={<i className="fa fa-search text-vermillon"></i>}
            iconAlignment="right"
            label="Rechercher"
            info="Prefixez votre recherche par un # pour faire une recherche par référence"
          />
          <Suspense
            fallback={
              <div className="BlockProduct__Loader">
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
              }}
            />
          </Suspense>
        </div>
      </div>
    );
  }
);

export default Search;
