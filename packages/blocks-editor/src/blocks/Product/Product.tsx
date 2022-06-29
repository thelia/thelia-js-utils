import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ProductSearch, useProductsBy } from "../../utils/queries";
import { Suspense, useEffect, useState } from "react";

import { ReactComponent as Icon } from "./assets/product.svg";
import Input from "../../components/Input";
import { reorder } from "../../utils/array";

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
    <div className="w-full flex justify-between bg-white rounded-md gap-4 md:gap-8 p-2 mb-4 items-center sm:h-20">
      {product?.[0]?.images.length > 0 ? (
        <img
          className="h-full hidden sm:block"
          src={product?.[0]?.images[0].url}
          alt="product image"
        />
      ) : (
        <img
          className="h-full hidden sm:block"
          src="https://via.placeholder.com/150"
          alt="product image"
        />
      )}
      <div className="flex flex-col md:flex-row md:w-1/5 md:justify-between md:gap-4">
        <div className="font-semibold text-left">{product?.[0]?.i18n.title}</div>
        <div className="text-sm md:text-base text-left text-gray-400">
          #{product?.[0]?.reference}
        </div>
      </div>

      <div className="md:border-x md:border-gray-400 flex gap-8 px-2 md:px-4">
        <button
          className={`${productIndex === 0 && "text-gray-400"}`}
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
          className={`${productIndex === data.productList.length - 1 && "text-gray-400"}`}
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
        className="hidden font-semibold tracking-wider border-2 border-vermillon text-vermillon hover:bg-vermillon hover:text-white px-2 md:px-4 md:py-1 rounded-md text-center lg:flex items-center"
      >
        <span className="md:mr-2">Fiche produit</span>
        <i className="fa fa-arrow-right hidden md:block"></i>
      </a>
      <button
        className="md:self-start hover:text-vermillon pr-1"
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

function ProductsList({ type, value, onUpdate }: ProductSearch & { onUpdate: Function }) {
  const { data: products } = useProductsBy({ type, value });
  return (
    <ul className="top-full bg-white rounded-md shadow-xl overflow-hidden w-full absolute">
      <>
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
                  className="px-8 py-4 cursor-pointer hover:bg-gray-200 flex flex-col"
                >
                  <span>{product.i18n.title}</span>
                  <span className="text-gray-400 text-sm">#{product.reference}</span>
                </li>
              ))}
          </>
        ) : value && value.length > 1 ? (
          <li className="px-8 py-4 text-center">
            <span>
              Aucun résultat{" "}
              {value && value.length > 0 ? (
                <span>
                  pour "<span className={`font-bold text-vermillon`}>{value}</span>"
                </span>
              ) : (
                ""
              )}
            </span>
          </li>
        ) : null}
      </>
    </ul>
  );
}

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
              <div className="text-center py-4 text-2xl text-vermillon">
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

      <div className="bg-white border-l-8 border-vermillon rounded-md shadow-md px-4 lg:px-14 py-4 lg:py-8">
        <span className="text-base text-mediumCharbon font-extrabold">
          Ajouter un produit
        </span>
        <div className="mt-4 xl:w-2/3 relative">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Référence, nom, ..."
            name="product-field"
            type="text"
            className={searchByRef ? "text-vermillon" : ""}
            icon={<i className="fa fa-search text-vermillon"></i>}
            iconAlignment="right"
            label="Rechercher"
          />
          <Suspense
            fallback={
              <div className="text-center py-4 text-2xl text-vermillon">
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
