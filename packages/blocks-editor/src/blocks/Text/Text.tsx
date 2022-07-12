import {
  forwardRef,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text, TextArea } from "../../components/Inputs";
import { BlockModuleComponentProps, BlockPluginDefinition } from "../../types/types";
import { ReactComponent as Icon } from "./assets/text.svg";
import { ReactComponent as ProductIcon } from "../Product/assets/product.svg";
import ReactQuill, { Quill } from "react-quill";

/* import "react-quill/dist/quill.snow.css"; */
import "./Text.css";
import ReactModal from "react-modal";

export type BlockTextData = {
  value: string;
};

const EditorToolbar = forwardRef(({}, ref: any) => {
  return (
    <div id="editor-toolbar">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <button className="ql-list" value="bullet" />
      <button className="ql-list" value="ordered" />
      <button className="ql-link" />
      <button
        className="product"
        onClick={() => {
          ref.current.editor.insert(0, "test");
        }}
      >
        <ProductIcon />
      </button>
    </div>
  );
});

const ProductSearchModal = forwardRef(({}, ref: Ref<ReactQuill>) => {
  const [query, setQuery] = useState("");

  return (
    <div className="BlockProduct__Content">
      <span className="BlockProduct__Content__Title">
        Rechercher un produit, une catégorie ou un contenu
      </span>
      <div className="BlockProduct__Content__Search">
        <Text
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Référence, catégorie, contenu, ..."
          id="BlockProduct-field-product"
          type="text"
          icon={<i className="fa fa-search text-vermillon"></i>}
          iconAlignment="right"
          label="Rechercher"
        />
      </div>
    </div>
  );
});

const BlockTextComponent = ({
  data,
  onUpdate,
}: BlockModuleComponentProps<BlockTextData>) => {
  const quillRef = useRef<any>(null);

  const [localData, setData] = useState<string>(data.value);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const insertProduct = () => {
    quillRef?.current?.editor?.insertText(0, "test");
  };

  useEffect(() => {
    setData(data.value);
  }, [data]);

  return (
    <div className="BlockText">
      {data !== undefined ? (
        <div className="BlockText__Editor">
          <EditorToolbar />
          <ReactQuill
            modules={{
              toolbar: {
                container: "#editor-toolbar",
              },
            }}
            ref={quillRef}
            value={localData}
            placeholder="Votre texte ici"
            onChange={(value) => setData(value)}
          />
        </div>
      ) : null}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="Modal-TheliaBlocks"
        overlayClassName="Overlay"
      >
        <ProductSearchModal ref={quillRef} />
      </ReactModal>
    </div>
  );
};

const initialData: BlockTextData = {
  value: "",
};

const moduleType = {
  id: "blockText",
};

const Blocktext: BlockPluginDefinition<BlockTextData> = {
  type: moduleType,
  component: BlockTextComponent,
  initialData,
  title: {
    default: "Text",
    fr_FR: "Texte",
  },
  icon: Icon,
  description: {
    default: "Display a formated text",
    fr_FR: "Affiche un texte mis en forme",
  },
  image: {
    default: "https://source.unsplash.com/featured/300x250?nature&blockText",
  },
};

export default Blocktext;
