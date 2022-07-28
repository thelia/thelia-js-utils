import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { Input } from "../Inputs";

import "./GroupTitle.css";

export default function GroupTitle() {
  const intl = useIntl();
  const [title, setTitle] = useState<string>("");

  const { group, editGroup } = useContext(BlocksGroupContext);

  useEffect(() => {
    if (group?.title) {
      setTitle(group.title);
    }
  }, [group]);

  return (
    <div className="GroupTitle__Wrapper">
      <Input
        value={title}
        id="GroupTitle-field-title"
        type="text"
        label={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME" })}
        placeholder={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME_PLACEHOLDER" })}
        info={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME_INFO" })}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        onBlur={() => editGroup({ ...group, title })}
      />
    </div>
  );
}
