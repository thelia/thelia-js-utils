import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { SearchProps, useProductsBy } from "../../utils/queries";
import { Suspense, useEffect, useState } from "react";

import { ReactComponent as Icon } from "./assets/product.svg";
import { Input } from "../../components/Inputs";
import { reorder } from "../../utils/array";

import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";

import "./Product.css";
import { useIntl } from "react-intl";

export type BlockProductData = {
  productList: string[];
};

export type BlockProductComponentProps = BlockModuleComponentProps<BlockProductData>;

const Product = ({
  productId,
  productIndex,
  data,
  onUpdate,
}: {
  productId: any;
  productIndex: number;
  data: any;
  onUpdate: Function;
}) => {
  const { data: product } = useProductsBy({ type: "ids", value: productId });
  const intl = useIntl();

  return (
    <div className="BlockProduct__Product">
      {product?.[0]?.images.length > 0 ? (
        <img
          className="Product__Image"
          src={product?.[0]?.images[0].url}
          alt="product image"
        />
      ) : (
        <img
          className="Product__Image"
          src="https://via.placeholder.com/150"
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
              productList: [...reorder(data.productList, productIndex, productIndex - 1)],
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
              productList: [...reorder(data.productList, productIndex, productIndex + 1)],
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
        onClick={() =>
          onUpdate({
            ...data,
            productList: data.productList.filter((id: any) => id != product?.[0]?.id),
          })
        }
      >
        <XMarkIcon />
      </button>
    </div>
  );
};

const ProductsList = ({
  type,
  value,
  onUpdate,
}: { onUpdate: Function } & SearchProps) => {
  const { data: products } = useProductsBy({ type, value });
  const intl = useIntl();

  return (
    <ul className="ProductList">
      {products?.length > 0 ? (
        <>
          {products
            ?.filter((product: any) => !products.includes(product.id))
            .map((product: any) => (
              <li
                key={product.id}
                onClick={() => {
                  onUpdate(product);
                }}
                className="ProductList__Item"
              >
                <span>{product.i18n.title}</span>
                <span className="ProductList__Item__Ref">#{product.reference}</span>
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

  useEffect(
    () => (query.startsWith("#") ? setSearchByRef(true) : setSearchByRef(false)),
    [query]
  );
  const type = searchByRef ? "reference" : "title";
  const value = searchByRef ? query.substring(1) : query;

  return (
    <div className="BlockProduct">
      {data.productList.map((productId: any, index) => {
        return (
          <Suspense
            key={index}
            fallback={
              <div className="BlockProduct__Product__Loader">
                <span>{intl.formatMessage({ id: "BlockProduct__PRODUCT_LOADING" })}</span>
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
            id="BlockProduct-field-product"
            type="text"
            className={searchByRef ? "text-vermillon" : ""}
            icon={<i className="fa fa-search text-vermillon"></i>}
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
  },
  icon: Icon,
  description: {
    default: "Display a product",
    fr: "Affiche un produit",
    en: "Display a product",
    es: "Mostrar un producto",
    it: "Mostra un prodotto",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockProduct",
  },
};

export default blockProduct;
