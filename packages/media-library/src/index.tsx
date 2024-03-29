import Image, { UploadImage } from "./Image";
import { registerPlugin } from "@thelia/blocks-editor";
import Library from "./Library";
import { LibraryImage } from "./types/types";

registerPlugin(Image);

export default Library;

export { UploadImage };
export type { LibraryImage };
