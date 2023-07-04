import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  IBlock,
} from "../../utils/types";
import { SearchProps, useCategoriesBy } from "../../utils/queries";
import { Suspense, useEffect, useState } from "react";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";
import { ReactComponent as Icon } from "./assets/category.svg";
import { Input } from "../../components/Inputs";
import { reorder } from "../../utils/array";
import { useIntl } from "react-intl";

import "./Category.css";
import ErrorBoundary from "../../components/ErrorBoundary";

export type BlockCategoryData = {
  categoryList: string[];
};

export type BlockCategoryComponentProps = BlockModuleComponentProps<BlockCategoryData>;

const Category = ({
  categoryId,
  categoryIndex,
  data,
  onUpdate,
}: {
  categoryId: string;
  categoryIndex: number;
  data: BlockCategoryData;
  onUpdate: Function;
}) => {
  const { data: category } = useCategoriesBy({
    type: "ids",
    value: categoryId,
  });
  const intl = useIntl();

  if (!category) return null;

  return (
    <div className="BlockCategory__Category">
      {category?.[0]?.images?.length > 0 ? (
        <img
          className="Category__Image"
          src={category?.[0]?.images[0].url}
          loading="lazy"
          alt="category image"
        />
      ) : (
        <img
          className="Category__Image"
          src="https://via.placeholder.com/150"
          loading="lazy"
          alt="category image"
        />
      )}
      <div className="Category__Infos">
        <div className="Category__Infos__Title">{category?.[0]?.i18n.title}</div>
        <div className="Category__Infos__Ref">#{category?.[0]?.id}</div>
      </div>

      <div className="Category__Actions">
        <button
          disabled={categoryIndex === 0}
          onClick={() =>
            onUpdate({
              ...data,
              categoryList: [
                ...reorder(data.categoryList, categoryIndex, categoryIndex - 1),
              ],
            })
          }
        >
          <i className="fa fa-arrow-up"></i>
        </button>

        <button
          disabled={categoryIndex === data.categoryList.length - 1}
          onClick={() =>
            onUpdate({
              ...data,
              categoryList: [
                ...reorder(data.categoryList, categoryIndex, categoryIndex + 1),
              ],
            })
          }
        >
          <i className="fa fa-arrow-down"></i>
        </button>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={category?.[0]?.url}
        className="Category__Link"
      >
        <span className="Category__Link__Label">
          {intl.formatMessage({ id: "CATEGORY_SHEET" })}
        </span>
        <i className="Category__Link__Icon fa fa-arrow-right"></i>
      </a>
      <button
        className="Category__Delete"
        onClick={() =>
          onUpdate({
            ...data,
            categoryList: data.categoryList.filter(
              (id: string) => id != category?.[0]?.id
            ),
          })
        }
      >
        <XMarkIcon />
      </button>
    </div>
  );
};

const CategorysList = ({
  currentCategoryList,
  type,
  value,
  onUpdate,
}: { currentCategoryList: string[]; onUpdate: Function } & SearchProps) => {
  const { data: categories } = useCategoriesBy({ type, value });
  const intl = useIntl();

  return (
    <ul className="CategoryList">
      {categories?.length > 0 ? (
        <>
          {categories
            ?.filter((category: any) => !currentCategoryList.includes(category.id))
            .map((category: any) => (
              <li
                key={category.id}
                onClick={() => {
                  onUpdate(category);
                }}
                className="CategoryList__Item"
              >
                <span>{category.i18n.title}</span>
                <span className="CategoryList__Item__Ref">#{category.reference}</span>
              </li>
            ))}
        </>
      ) : value && value.length > 1 ? (
        <li className="CategoryList__NoResults">
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

function BlockCategoryComponent({ data, onUpdate }: BlockCategoryComponentProps) {
  const [searchByRef, setSearchByRef] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const intl = useIntl();

  useEffect(() => {
    query.startsWith("#") ? setSearchByRef(true) : setSearchByRef(false);
  }, [query]);

  const type = searchByRef ? "reference" : "title";
  const value = searchByRef ? query.substring(1) : query;

  return (
    <div className="BlockCategory">
      {data.categoryList.map((categoryId: string, index) => {
        return (
          <Suspense
            key={index}
            fallback={
              <div className="BlockCategory__Category__Loader">
                <i className="Loader fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <Category
              categoryIndex={index}
              categoryId={categoryId}
              data={data}
              onUpdate={onUpdate}
            />
          </Suspense>
        );
      })}

      <div className="BlockCategory__Content">
        <span className="BlockCategory__Content__Title">
          {intl.formatMessage({ id: "BlockCategory__ADD_CATEGORY" })}
        </span>
        <div className="BlockCategory__Content__Search">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder={intl.formatMessage({ id: "SEARCH_BY" })}
            info={intl.formatMessage({ id: "SEARCH_BY_INFO" })}
            id="BlockCategory-field-category"
            type="text"
            emphasize={searchByRef}
            icon={<i className="fa fa-search emphasize"></i>}
            iconAlignment="right"
            label={intl.formatMessage({ id: "SEARCH" })}
          />
          <Suspense
            fallback={
              <div className="BlockCategory__Loader">
                <i className="fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <CategorysList
              currentCategoryList={data.categoryList}
              searchIn="category"
              type={type}
              value={value}
              onUpdate={(category: any) => {
                onUpdate({
                  ...data,
                  categoryList: [...data.categoryList, category.id],
                });
                setQuery("");
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const initialData: BlockCategoryData = {
  categoryList: [],
};

const moduleType = {
  id: "blockCategory",
};

const blockCategory: BlockPluginDefinition<BlockCategoryData> = {
  type: moduleType,
  component: BlockCategoryComponent,
  initialData,
  title: {
    default: "Category",
    fr: "Categorie",
    en: "Category",
    es: "Categoría",
    it: "Categoria",
  },
  icon: Icon,
  description: {
    default: "Display a category",
    fr: "Affiche une catégorie",
    en: "Display a category",
    es: "Mostrar un categoría",
    it: "Mostra un categoria",
  },
};

export default blockCategory;
