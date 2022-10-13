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

  return (
    <iframe
      src="about:blank"
      frameBorder="0"
      ref={ref}
      sandbox="allow-same-origin allow-scripts"
    />
  );
};
export default Iframe;
