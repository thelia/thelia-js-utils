import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { BlocksGroupContext } from "../../providers/BlockGroupContext";
import { Input } from "../Inputs";

import "./GroupTitle.css";

export default function GroupTitle({
  isGroupLinkedToCurrentContent,
  onLink,
  isLinking,
}: {
  isGroupLinkedToCurrentContent: boolean;
  onLink: () => void;
  isLinking: boolean;
}) {
  const [title, setTitle] = useState<string>("");

  const intl = useIntl();

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
        placeholder={intl.formatMessage({
          id: "GroupTitle__BLOCK_NAME_PLACEHOLDER",
        })}
        info={intl.formatMessage({ id: "GroupTitle__BLOCK_NAME_INFO" })}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={(e) => editGroup({ ...group, title: e.target.value })}
      />
      {isGroupLinkedToCurrentContent ? (
        <button onClick={onLink} className="BlocksEditor__Header__Unlink__Button">
          {isLinking ? (
            <i className="fa fa-circle-notch fa-spin"></i>
          ) : (
            <>
              <i className="fas fa-unlink"></i>
              {intl.formatMessage({ id: "UNLINK" })}
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}
