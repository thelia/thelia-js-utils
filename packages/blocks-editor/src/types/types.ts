import { FunctionComponent, ReactNode, SVGProps } from "react";

export type ErrorType = {
  message: string;
  statusCode: number;
  statusText: string;
};

export type Locale = {
  id: number;
  title: string;
  code: string;
  active: boolean;
};

export type BlockModuleComponentProps<T> = {
  data: T;
  onUpdate: <T>(newData: any) => T | void;
  [key: string]: any;
};

export type i18nString = {
  default: string;
  [key: string]: string;
};

export type BlockModuleType = {
  id: string;
};
export type BlockModuleI18n = {
  title: i18nString;
  description?: i18nString;
  image?: i18nString;
};

export type IBlock = {
  readonly id: string;
  readonly type: BlockModuleType;
  parent: IBlock["id"] | null;
  title?: i18nString;
  data: any;
};

export type itemBlockGroupsType = {
  groupId?: number;
  blockGroupId?: number;
  id?: number;
  itemId?: number;
  itemTitle?: string;
  itemType?: string;
  itemUrl?: string;
};

export type GroupTypeStore = {
  id?: number;
  visible?: boolean;
  title?: string;
  slug?: string | null;
  locales?: string[];
  itemBlockGroups?: itemBlockGroupsType[];
};

export type BlockGroupPatch = {
  blockGroup: {
    id: number;
    visible: boolean;
    title: string;
    slug: string | null;
    jsonContent: string;
  };
  itemBlockGroup?: {
    id?: number;
    itemType?: string;
    itemId?: number;
    blockGroupId?: number;
  };
  locale: string;
};

export type GroupTypeResponse = GroupTypeStore & {
  jsonContent: IBlock[];
};

export type BlockPluginDefinition<TProp = { [key: string]: any }> =
  BlockModuleI18n & {
    readonly type: BlockModuleType;
    readonly component: (props: {
      data: TProp;
      id: string;
      onUpdate: (props: TProp) => any;
      [key: string]: any;
    }) => JSX.Element;
    initialData: TProp;
    internalOnly?: boolean;
    icon: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
    layout?: string;
  };

export type uiStoreType = {
  isUnsaved: boolean;
  windowConstants: {
    groupId?: GroupTypeStore["id"];
    itemId?: itemBlockGroupsType["itemId"];
    itemType?: itemBlockGroupsType["itemType"];
  };
};

export type Video = {
  url: string | null;
  videoId: string | null;
};

export type Plugin = BlockModuleI18n & {
  id: string;
  readonly type: BlockModuleType;
  readonly component: Function;
  initialData: Record<string, any>;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  internalOnly?: boolean;
  customIcon?: JSX.Element;
  layout?: i18nString;
  title?: i18nString;
};

export type EditorModule = {
  name: string;
  tooltip: string;
  value?: string;
};
