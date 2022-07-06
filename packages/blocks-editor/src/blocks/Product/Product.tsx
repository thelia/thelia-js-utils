import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ProductSearch, useProductsBy } from "../../utils/queries";
import { Suspense, useEffect, useState } from "react";

import { ReactComponent as Icon } from "./assets/product.svg";
import { Text } from "../../components/Inputs";
import { reorder } from "../../utils/array";

import "./Product.module.css";

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
        <span className="Product__Link__Label">Fiche produit</span>
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
        <i className="fa fa-xmark"></i>
      </button>
    </div>
  );
};

const ProductsList = ({
  type,
  value,
  onUpdate,
}: { onUpdate: Function } & ProductSearch) => {
  const { data: products } = useProductsBy({ type, value });
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

function BlockProductComponent({ data, onUpdate }: BlockProductComponentProps) {
  const [searchByRef, setSearchByRef] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

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
            fallback={
              <div className="BlockProduct__Loader">
                <i className="fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <Product
              key={index}
              productIndex={index}
              productId={productId}
              data={data}
              onUpdate={onUpdate}
            />
          </Suspense>
        );
      })}

      <div className="BlockProduct__Content">
        <span className="BlockProduct__Content__Title">Ajouter un produit</span>
        <div className="BlockProduct__Content__Search">
          <Text
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Référence, nom, ..."
            id="BlockProduct-field-product"
            type="text"
            className={searchByRef ? "text-vermillon" : ""}
            icon={<i className="fa fa-search text-vermillon"></i>}
            iconAlignment="right"
            label="Rechercher"
          />
          <Suspense
            fallback={
              <div className="BlockProduct__Loader">
                <i className="fa fa-circle-notch fa-spin"></i>
              </div>
            }
          >
            <ProductsList
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
    fr_FR: "Produit",
  },
  icon: Icon,
  description: {
    default: "Display a product",
    fr_FR: "Affiche des produits du catalogue",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockProduct",
  },
};

export default blockProduct;
