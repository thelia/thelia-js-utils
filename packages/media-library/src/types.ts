export type LibraryImage = {
  id: number | null;
  url: string | null;
  fileName: string;
  title: string;
  link?: {
    url: string;
    target?: string;
  };
};
