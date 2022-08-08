import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { Input } from "../Inputs";

import "./GroupTitle.css";

export default function GroupTitle() {
  const intl = useIntl();

  const { group, editGroup } = useContext(BlocksGroupContext);

  return (
    <div className="GroupTitle__Wrapper">
      <Input
        value={group?.title || ""}
        id="GroupTitle-field-title"
        type="text"
        label={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME" })}
        placeholder={intl.formatMessage({
          id: "GroupTitle__BLOCK_NAME_PLACEHOLDER",
        })}
        info={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME_INFO" })}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          editGroup({ ...group, title: e.target.value })
        }
      />
    </div>
  );
}
