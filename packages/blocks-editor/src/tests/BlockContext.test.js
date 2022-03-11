import * as React from "react";
import * as ReactDOM from "react-dom";

import ListMedia from "../ListMedia";
import { act } from "react-dom/test-utils";

describe("ListMedia", function () {
  it("should display Hello from ListMedia", function () {
    let container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ListMedia />, container);
    });
    const header = container.querySelector("div");
    expect(header.textContent).toBe("Hello from ListMedia");
  });
});
