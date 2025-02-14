import {
  BlockModuleComponentProps,
  BlockPluginDefinition,
  IBlock,
} from "../../utils/types";
import { SearchProps, useProductsBy } from "../../utils/queries";
import { Suspense, useEffect, useState } from "react";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";
import { ReactComponent as Icon } from "./assets/product.svg";
import { Input } from "../../components/Inputs";
import { reorder } from "../../utils/array";
import { useIntl } from "react-intl";

import "./Product.css";
import ErrorBoundary from "../../components/ErrorBoundary";

export type BlockProductData = {
  productList: string[];
};

export type BlockProductComponentProps =
  BlockModuleComponentProps<BlockProductData>;

const Product = ({
  productId,
  productIndex,
  data,
  onUpdate,
}: {
  productId: string;
  productIndex: number;
  data: BlockProductData;
  onUpdate: Function;
}) => {
  const { data: product, isFetched } = useProductsBy({
    type: "ids",
    value: productId,
  });
  const intl = useIntl();

  return (
    <div className="BlockProduct__Product">
      {product?.[0]?.images.length > 0 ? (
        <img
          className="Product__Image"
          src={product?.[0]?.images[0].url}
          loading="lazy"
          alt="product image"
        />
      ) : (
        <img
          className="Product__Image"
          src="https://via.placeholder.com/150"
          loading="lazy"
          alt="product image"
        />
      )}
      <div className="Product__Infos">
        <div className="Product__Infos__Title">{product?.[0]?.i18n.title}</div>
        <div className="Product__Infos__Ref">#{product?.[0]?.reference}</div>
      </div>

      <div className="Product__Actions">
        <button
          disabled={productIndex === 0}
          onClick={() =>
            onUpdate({
              ...data,
              productList: [
                ...reorder(data.productList, productIndex, productIndex - 1),
              ],
            })
          }
        >
          <i className="fa fa-arrow-up"></i>
        </button>

        <button
          disabled={productIndex === data.productList.length - 1}
          onClick={() =>
            onUpdate({
              ...data,
              productList: [
                ...reorder(data.productList, productIndex, productIndex + 1),
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
        href={product?.[0]?.url}
        className="Product__Link"
      >
        <span className="Product__Link__Label">
          {intl.formatMessage({ id: "PRODUCT_SHEET" })}
        </span>
        <i className="Product__Link__Icon fa fa-arrow-right"></i>
      </a>
      <button
        className="Product__Delete"
        onClick={() => {
          if (product.length) {
            onUpdate({
              ...data,
              productList: data.productList.filter((id: string) => {
                return id != product?.[0]?.id;
              }),
            });
            return;
          }

          onUpdate({
            ...data,
            productList: data.productList.filter((id: string) => {
              return id != productId;
            }),
          });
        }}
      >
        <XMarkIcon />
      </button>
    </div>
  );
};

const ProductsList = ({
  currentProductList,
  type,
  value,
  onUpdate,
}: { currentProductList: string[]; onUpdate: Function } & SearchProps) => {
  const { data: products } = useProductsBy({ type, value });
  const intl = useIntl();

  console.log("products", products, currentProductList);

  return (
    <ul className="ProductList">
      {products?.length > 0 ? (
        <>
          {products
            ?.filter((product: any) => !currentProductList.includes(product.id))
            .map((product: any) => (
              <li
                key={product.id}
                onClick={() => {
                  onUpdate(product);
                }}
                className="ProductList__Item"
              >
                <span>{product.i18n.title}</span>
                <span className="ProductList__Item__Ref">
                  #{product.reference}
                </span>
              </li>
            ))}
        </>
      ) : value && value.length > 1 ? (
        <li className="ProductList__NoResults">
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

function BlockProductComponent({ data, onUpdate }: BlockProductComponentProps) {
  const [searchByRef, setSearchByRef] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const intl = useIntl();

  useEffect(() => {
    query.startsWith("#") ? setSearchByRef(true) : setSearchByRef(false);
  }, [query]);

  const type = searchByRef ? "reference" : "title";
  const value = searchByRef ? query.substring(1) : query;

  return (
    <div className="BlockProduct">
      {data.productList.map((productId: string, index) => {
        return (
          <Suspense
            key={index}
            fallback={
              <div className="BlockProduct__Product__Loader">
                <i className="Loader fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <Product
              productIndex={index}
              productId={productId}
              data={data}
              onUpdate={onUpdate}
            />
          </Suspense>
        );
      })}

      <div className="BlockProduct__Content">
        <span className="BlockProduct__Content__Title">
          {intl.formatMessage({ id: "BlockProduct__ADD_PRODUCT" })}
        </span>
        <div className="BlockProduct__Content__Search">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder={intl.formatMessage({ id: "SEARCH_BY" })}
            info={intl.formatMessage({ id: "SEARCH_BY_INFO" })}
            id="BlockProduct-field-product"
            type="text"
            emphasize={searchByRef}
            icon={<i className="fa fa-search emphasize"></i>}
            iconAlignment="right"
            label={intl.formatMessage({ id: "SEARCH" })}
          />
          <Suspense
            fallback={
              <div className="BlockProduct__Loader">
                <i className="fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <ProductsList
              currentProductList={data.productList}
              searchIn="product"
              type={type}
              value={value}
              onUpdate={(product: any) => {
                onUpdate({
                  ...data,
                  productList: [...data.productList, product.id],
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

const initialData: BlockProductData = {
  productList: [],
};

const moduleType = {
  id: "blockProduct",
};

const blockProduct: BlockPluginDefinition<BlockProductData> = {
  type: moduleType,
  component: BlockProductComponent,
  initialData,
  title: {
    default: "Product",
    fr: "Produit",
    en: "Product",
    es: "Producto",
    it: "Prodotto",
    cz: "Produit",
    pl: "Produit",
    de: "Produit",
  },
  icon: Icon,
  description: {
    default: "Display a product",
    fr: "Affiche un produit",
    en: "Display a product",
    es: "Mostrar un producto",
    it: "Mostra un prodotto",
    cz: "Affiche un produit",
    pl: "Affiche un produit",
    de: "Affiche un produit",
  },
};

export default blockProduct;
