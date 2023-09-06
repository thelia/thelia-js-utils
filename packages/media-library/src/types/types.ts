export type ImageTag = {
  imageTag: {
    id: number;
    imageId: number;
    tagId: number
  },
  tag: {
    id: number;
    title: string;
    colorCode: string;
  }
}

export type LibraryImage = {
  id: number | null;
  fileName: string;
  title: string;
  tags: ImageTag[];
  width: string;
  height: string;
  link?: {
    url: string;
    target?: string;
  };
};
