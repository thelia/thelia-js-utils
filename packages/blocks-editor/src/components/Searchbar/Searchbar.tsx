import { useIntl } from "react-intl";
import { Input } from "../Inputs";
import { ReactComponent as Icon } from "./assets/search.svg";

export default function Searchbar() {
    const intl =useIntl();
  return (
    <div>
      <Input onChange={(e) => console.log(e.target)} id="searchbar" icon={<Icon className="w-4 h-4"/>} iconAlignment="right" placeholder={intl.formatMessage({ id: "SEARCH_BY_NAME" })}/>
    </div>
  );
}
