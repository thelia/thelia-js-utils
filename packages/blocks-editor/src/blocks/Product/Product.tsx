import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";

import * as React from "react";
import useSWR from "swr";

export type BlockProductData = {
  productList: string[];
};

export type BlockProductComponentProps = BlockModuleComponentProps<BlockProductData>;

function Product({
  product,
  data,
  onUpdate,
}: {
  product: any;
  data: any;
  onUpdate: Function;
}) {
  function removeFromList(productId: any) {
    //Fonction du bouton Supprimer
    let newProductList = data.productList.filter(function (product: any) {
      return product != productId;
    });
    onUpdate({ ...data, productList: newProductList });
  }
  return (
    <div className="flex flex-row col-span-1 m-4 font-sans bg-gray-100 shadow-lg rounded-2xl">
      <div className="w-full">
        <div className="flex flex-col px-8 pb-2 bg-lime-100 rounded-2xl">
          {product.images.length > 0 ? (
            <img className="w-full" src="" alt="image" />
          ) : null}
          <div className="pt-6 m-2 text-2xl font-bold">{product.i18n.title}</div>

          <div className="self-end">
            <span className="m-2 font-sans text-xl text-gray-600 place-self-end">
              {product.productSaleElements[0].price.untaxed} $
            </span>
            <span className="m-2 text-xl font-bold text-gray-700 place-self-end">
              {product.productSaleElements[0].price.taxed} $
            </span>
          </div>

          <div className="py-4">
            {product.categories.map(function (category: any) {
              return (
                <span className="relative inline-flex px-3 py-1 font-sans text-xl font-semibold text-gray-700 bg-gray-200 rounded-full">
                  <p className="inline-block m-2">{category.i18n.title}</p>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <a
        className="relative inline-block w-12 h-12 m-4 bg-red-400 rounded-full hover:text-black hover:bg-red-600"
        onClick={() =>
          onUpdate({
            ...data,
            productList: data.productList.filter((id: any) => id != product.id),
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-8 h-8 m-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </a>
    </div>
  );
}

function BlockProductComponent({ data, onUpdate }: BlockProductComponentProps) {
  const [query, setQuery] = React.useState<string>(""); //Recherche par titres

  const products = useSWR(`/product/search?title=${query}`);

  return (
    <div className="p-4 BlockProduct">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1">
          <input
            type="text"
            value={query}
            className="w-full px-8 py-4 font-sans text-2xl"
            placeholder="Find a product inside the catalog"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <ul className="font-sans text-2xl border border-gray-400 divide-y divide-gray-400 top-full">
            {products?.data?.map((product: any) => (
              <li
                key={product.id}
                onClick={() =>
                  onUpdate({ ...data, productList: [...data.productList, product.id] })
                }
                className="px-8 py-4 cursor-pointer hover:bg-gray-100"
              >
                {product.i18n.title}
              </li>
            ))}
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
