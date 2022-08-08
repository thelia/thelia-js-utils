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
  url: string | null;
  fileName: string;
  title: string;
  tags: ImageTag[];
  link?: {
    url: string;
    target?: string;
  };
};
