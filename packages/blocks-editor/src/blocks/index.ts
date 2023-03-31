import {
  layoutsAsColumn,
  TwoColumns,
  ThreeColumns,
  FourColumns,
  SixColumns,
  FiveColumns,
} from "./MultiColumns";

import Accordion from "./Accordion";
import Button from "./Button";
import Product from "./Product";
import Category from "./Category";
import Table from "./Table";
import Raw from "./Raw";
import Separator from "./Separator";
import Text from "./Text";
import Title from "./Title";
import Video from "./Video";
import List from "./List";
import Group from "./Group";
import Highlight from "./Highlight";

const Columns = {
  ...layoutsAsColumn,
  TwoColumns,
  ThreeColumns,
  FourColumns,
  FiveColumns,
  SixColumns,
};

export {
  Raw,
  Text,
  Title,
  Video,
  Columns,
  Separator,
  Button,
  Accordion,
  Product,
  Category,
  Table,
  List,
  Group,
  Highlight,
};
