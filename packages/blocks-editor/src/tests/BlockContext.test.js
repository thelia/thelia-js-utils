import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { BlockContextProvider } from "../providers/BlockContext";
import { useBlocksContext } from "../hooks/useBlockContext";

const wrapper = ({ children }) => (
  <BlockContextProvider>{children}</BlockContextProvider>
);

test("should add blocks to the list", () => {
  const { result } = renderHook(() => useBlocksContext(), { wrapper });

  act(() => {
    result.current.addBlock({ id: "1" });
    result.current.addBlock({ id: "2" });
  });

  expect(result.current.blockList[0].id).toBe("1");
  expect(result.current.blockList[1].id).toBe("2");
});

test("should remove blocks to the list", () => {
  const { result } = renderHook(() => useBlocksContext(), { wrapper });

  act(() => {
    result.current.addBlock({ id: "1" });
    result.current.addBlock({ id: "2" });
  });

  act(() => result.current.removeBlock("1"));

  expect(result.current.blockList.length).toBe(1);
  expect(result.current.blockList[0].id).toBe("2");
});

test("should update blocks in the list", () => {
  const { result } = renderHook(() => useBlocksContext(), { wrapper });

  act(() => result.current.addBlock({ id: "id" }));

  act(() => result.current.updateBlock("id", { level: 1, text: "new value" }));
  expect(result.current.blockList[0].data.text).toBe("new value");
});

test("should move blocks up / down and at a specific index in the list", () => {
  const { result } = renderHook(() => useBlocksContext(), { wrapper });

  act(() => {
    result.current.addBlock({ id: "1" });
    result.current.addBlock({ id: "2" });
    result.current.addBlock({ id: "3" });
  });

  act(() => result.current.moveBlockUp(result.current.findBlockIndex("2")));
  expect(result.current.blockList[0].id).toBe("2");

  act(() => result.current.moveBlockDown(result.current.findBlockIndex("2")));
  expect(result.current.blockList[1].id).toBe("2");

  act(() => result.current.moveBlockDown(result.current.findBlockIndex("2")));
  expect(result.current.blockList[2].id).toBe("2");

  act(() => result.current.moveBlockTo(result.current.findBlockIndex("2"), 1));
  expect(result.current.blockList[2].id).toBe("3");
});
