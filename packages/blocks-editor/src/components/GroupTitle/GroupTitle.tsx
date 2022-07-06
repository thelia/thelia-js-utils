import { ChangeEvent, useContext, useEffect, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { Text } from "../Inputs";

import "./GroupTitle.module.css";

export default function GroupTitle() {
  const [title, setTitle] = useState<string>("");

  const { group, editGroup } = useContext(BlocksGroupContext);

  useEffect(() => {
    if (group?.title) {
      setTitle(group.title);
    }
  }, [group]);

  return (
    <div className="GroupTitle__Wrapper">
      <Text
        value={title}
        id="GroupTitle-field-title"
        type="text"
        label="Nom de votre Thelia Blocks"
        placeholder="Indiquez le nom de votre Thelia Blocks"
        info="Ce nom sera utilisé dans le titre de votre Thelia Blocks"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        onBlur={() => editGroup({ ...group, title })}
      />
    </div>
  );
}
