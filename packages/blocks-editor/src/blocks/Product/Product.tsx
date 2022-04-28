import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";

import * as React from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faCircleNotch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
  const { data: product } = useSWR(`/product/search?id=${productId}`);

  return (
    <div className="w-full flex justify-between bg-white rounded-md gap-8 p-2 my-4 items-center h-20">
      {product?.[0]?.images.length > 0 ? (
        <img className="h-full" src={product?.[0]?.images[0].url} alt="product image" />
      ) : (
        <img
          className="h-full"
          src="https://via.placeholder.com/150"
          alt="product image"
        />
      )}
      <div className="font-semibold w-1/5 text-left">{product?.[0]?.i18n.title}</div>
      <div className="w-1/5 text-left text-gray-400"># {product?.[0]?.reference}</div>
      <div className="border-x border-gray-400 flex gap-8 px-4">
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
          <FontAwesomeIcon icon={faArrowUp} />
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
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={product?.[0]?.url}
        className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white inline-block px-4 py-1 rounded-md text-center"
      >
        <span className="mr-4">Voir la fiche produit</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </a>
      <button
        className="self-start hover:text-red-500"
        onClick={() =>
          onUpdate({
            ...data,
            productList: data.productList.filter((id: any) => id != product?.[0]?.id),
          })
        }
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

function BlockProductComponent({ data, onUpdate }: BlockProductComponentProps) {
  const [searchByRef, setSearchByRef] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(
    () => (query.startsWith("#") ? setSearchByRef(true) : setSearchByRef(false)),
    [query]
  );

  const { data: products, isValidating } = useSWR(
    query.length > 0
      ? `/product/search?${searchByRef ? "reference" : "title"}=${
          searchByRef ? query.substring(1) : query
        }`
      : null
  );

  return (
    <div className="p-4 BlockProduct">
      {data.productList.map((productId: any, index) => {
        return (
          <Product
            key={index}
            productIndex={index}
            productId={productId}
            data={data}
            onUpdate={onUpdate}
          />
        );
      })}

      <div className="bg-white border-l-8 border-red-600 rounded-md shadow-md px-20 py-14">
        <span className="text-2xl font-bold">Ajouter un produit</span>
        <div className="mt-4 w-2/3">
          <label htmlFor="product-field">Rechercher</label>
          <input
            name="product-field"
            type="text"
            value={query}
            className={`w-full rounded-md placeholder-gray-400 ${
              searchByRef ? "text-blue-500" : ""
            }`}
            placeholder="Référence, nom, ..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <ul className="top-full bg-white rounded-md shadow-xl overflow-hidden">
            {isValidating ? (
              <li className="text-center py-4 text-2xl text-red-500">
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </li>
            ) : (
              <>
                {products?.length > 0 ? (
                  <>
                    {products
                      ?.filter((product: any) => !data.productList.includes(product.id))
                      .map((product: any) => (
                        <li
                          key={product.id}
                          onClick={() => {
                            onUpdate({
                              ...data,
                              productList: [...data.productList, product.id],
                            });
                            setQuery("");
                          }}
                          className="px-8 py-4 cursor-pointer hover:bg-gray-300 flex flex-col"
                        >
                          <span>{product.i18n.title}</span>
                          <span className="text-gray-400 text-sm">
                            # {product.reference}
                          </span>
                        </li>
                      ))}
                  </>
                ) : query.length > 1 ? (
                  <li className="px-8 py-4 text-center">
                    <span>
                      Aucun résultat{" "}
                      {query.length > 0 ? (
                        <span>
                          pour "
                          <span
                            className={`font-bold ${
                              searchByRef ? "text-blue-500" : "text-gray-500"
                            }`}
                          >
                            {query}
                          </span>
                          "
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </li>
                ) : null}
              </>
            )}
          </ul>
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
  description: {
    default: "Display a product",
    fr_FR: "Affiche des produits du catalogue",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockProduct",
  },
};

export default blockProduct;
