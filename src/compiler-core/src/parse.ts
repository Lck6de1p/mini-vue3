import { NodeTypes } from "./ast";

const openDelimiter = "{{";
const closeDelimiter = "}}";

export function baseParse(content: string) {
  const context = createParseContext(content);
  return createRoot(parseChildren(context))
}

function createRoot(children) {
  return {
    children
  }
}

function parseChildren(context) {
  const nodes: any = [];
  let node;
  if (context.source.startsWith(openDelimiter)) {
    node = parseInterpolation(context);
  }
  nodes.push(node);
  return nodes
}

function parseInterpolation(context) {
  const closedIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);

  advanceBy(context, openDelimiter.length);
  const rawContentLength = closedIndex - openDelimiter.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim();

  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    }
  }
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length);
}

function createParseContext(content: string) {
  return {
    source: content
  }
}
