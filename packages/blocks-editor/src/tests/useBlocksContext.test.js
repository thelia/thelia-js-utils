import { renderHook, act } from "@testing-library/react-hooks";
import * as React from "react";
import {
  BlockContext,
  BlockContextProvider,
  useBlocksContext,
} from "../BlockContext";

describe("useBlocksContext", () => {
  test("should add block to list", () => {
    const wrapper = ({ children }) => (
      <BlockContextProvider>{children}</BlockContextProvider>
    );
    const { result } = renderHook(() => useBlocksContext(), { wrapper });
    const { result: blocks } = renderHook(
      () => React.useContext(BlockContext),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.addBlock({
        id: "id",
        type: {
          id: "blockText",
        },
        parent: null,
        data: {
          level: 3,
          text: "text",
        },
      });
    });

    expect(blocks.current.blocks.length).toBe(8);
  });

  test("should remove block from list", () => {
    const { result } = renderHook(() => useBlocksContext(), { wrapper });
    const { result: blocks } = renderHook(
      () => React.useContext(BlockContext),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.addBlock({
        id: "id",
        type: {
          id: "blockText",
        },
        parent: null,
        data: {
          level: 3,
          text: "text",
        },
      });
    });

    act(() => {
      result.current.removeBlock("id");
    });

    expect(blocks.current.blocks.length).toBe(7);
  });

  test("should update block from list", () => {
    const { result } = renderHook(() => useBlocksContext(), { wrapper });
    const { result: blocks } = renderHook(
      () => React.useContext(BlockContext),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.addBlock({
        id: "id",
        type: {
          id: "blockText",
        },
        parent: null,
        data: {
          level: 3,
          text: "text",
        },
      });
    });

    act(() => {
      result.current.updateBlock("id", {
        data: { level: 2, text: "New Text" },
      });
    });

    expect(blocks.current.blocks[7].data.text).toBe("New Text");
  });

  test("should move block in list", () => {
    const { result } = renderHook(() => useBlocksContext(), { wrapper });
    const { result: blocks } = renderHook(
      () => React.useContext(BlockContext),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.addBlock({
        id: "id",
        type: {
          id: "blockText",
        },
        parent: null,
        data: {
          level: 3,
          text: "text",
        },
      });
    });

    act(() => {
      result.current.moveBlockDown("id");
    });

    expect(blocks.current.blocks[6].data.text).toBe("text");

    act(() => {
      result.current.moveBlockUp("id");
    });

    expect(blocks.current.blocks[7].data.text).toBe("text");

    act(() => {
      result.current.moveBlockTo("id", 0);
    });

    expect(blocks.current.blocks[0].data.text).toBe("text");
  });
});
