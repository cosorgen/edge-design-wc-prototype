const LOG_STATS = false;

export function recurseDoc(
  node: Node,
  searchFunc: (node: Node) => boolean,
  actionFunc: (node: Node) => void,
) {
  // Go as deep as possible first
  for (let i = node.childNodes.length - 1; i >= 0; i--) {
    const child = node.childNodes[i];
    recurseDoc(child, searchFunc, actionFunc);
  }

  // Clean up on the way back up
  if (searchFunc(node)) {
    actionFunc(node);
  }
}

export function docToText(doc: Document) {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

export default function minify(page: string) {
  // Prepare the page for the LLM
  const parser = new DOMParser();
  const doc = parser.parseFromString(page, 'text/html');
  const docSize = docToText(doc).length;

  // Remove everything from head except for the title, description, and keywords
  const head = doc.querySelector('head');
  if (!head) return;
  const title = head.querySelector('title');
  const description = head.querySelector('meta[name="description"]');
  const keywords = head.querySelector('meta[name="keywords"]');
  head.innerHTML = '';
  if (title) head.appendChild(title);
  if (description) head.appendChild(description);
  if (keywords) head.appendChild(keywords);

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing head`,
    );

  // Remove any script tags
  doc.querySelectorAll('script').forEach((s) => s.remove());

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing scripts`,
    );

  // Remove any styles
  doc.querySelectorAll('style').forEach((s) => s.remove());

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing styles`,
    );

  // Remove any svgs
  doc.querySelectorAll('svg').forEach((s) => s.remove());

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing svgs`,
    );

  // Remove all attributes from all tags except in include set
  const skipAttrs = ['alt'];
  doc.querySelectorAll('*').forEach((el) => {
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      if (!skipAttrs.includes(el.attributes[i].name))
        el.removeAttribute(el.attributes[i].name);
    }
  });

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing attributes`,
    );

  // Remove any comment nodes from the page
  recurseDoc(
    doc,
    (node) => node.nodeType === Node.COMMENT_NODE, // Search function
    (node) => node.parentNode?.removeChild(node), // Action function
  );

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing comments`,
    );

  // Remove any empty tags
  const selfClosingTags = ['IMG', 'INPUT', 'AREA', 'BR', 'COL', 'HR', 'SOURCE'];
  recurseDoc(
    doc,
    (node: Node) =>
      node.childNodes.length === 0 &&
      node.nodeType === Node.ELEMENT_NODE &&
      !selfClosingTags.includes((node as HTMLElement).tagName), // Search function
    (node: Node) => node.parentNode?.removeChild(node), // Action function
  );

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing empty tags`,
    );

  // Remove nested divs and spans
  const nestedTypes = ['DIV', 'SPAN'];
  recurseDoc(
    doc,
    (node: Node) =>
      node.childNodes.length === 1 &&
      node.nodeType === Node.ELEMENT_NODE &&
      nestedTypes.includes((node as HTMLElement).tagName), // Search function
    (node: Node) => node.parentNode?.replaceChild(node.childNodes[0], node), // Action function
  );

  if (LOG_STATS)
    console.log(
      `${((docToText(doc).length / docSize) * 100).toFixed(2)}% of original size after removing nested divs and spans`,
    );

  // Remove any empty text nodes
  const output = docToText(doc)
    .replace(/>[\s\n\t]+</gm, '><') // Remove whitespace between tags
    .replace(/\s{2,}/gm, ' '); // Collapse multiple spaces

  if (LOG_STATS)
    console.log(
      `${((output.length / docSize) * 100).toFixed(2)}% of original size after removing whitespace`,
    );

  return output;
}
