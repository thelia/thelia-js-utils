import { ChangeEvent, useContext, useEffect, useState } from "react";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { Text } from "../Inputs";

export default function GroupTitle() {
  const [title, setTitle] = useState<string>("");

  const { group, editGroup } = useContext(BlocksGroupContext);

  useEffect(() => {
    if (group?.title) {
      setTitle(group.title);
    }
  }, [group]);

  return (
    <div className="w-2/5">
      <Text
        value={title}
        name="group-title"
        type="text"
        label="Nom de votre Thelia Blocks"
        placeholder="Indiquez le nom de votre Thelia Blocks"
        className="py-2"
        info="Ce nom sera utilisé dans le titre de votre Thelia Blocks"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        onBlur={() => editGroup({ ...group, title })}
      />
    </div>
  );
}
