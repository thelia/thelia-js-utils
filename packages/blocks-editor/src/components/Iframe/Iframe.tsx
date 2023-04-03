import { useEffect, useRef } from "react";

const Iframe = ({ content }: { content: string }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    let doc = node.contentDocument;

    if (!doc) return;

    doc.open();
    doc.write(content);
    doc.close();
    node.style.width = "100%";
    if (node.contentWindow) {
      node.style.height = `70vh`;
    }
  }, [ref, content]);

  useEffect(() => {
    const cancelClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    const iframe = ref.current;

    if (iframe?.contentWindow) {
      iframe.contentWindow.addEventListener("click", cancelClick);
    }

    return () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.removeEventListener("click", cancelClick);
      }
    };
  }, []);

  return <iframe src="about:blank" ref={ref} sandbox="allow-same-origin allow-scripts" />;
};

export default Iframe;
