import { NodeTypes } from "./ast";

const enum TagType {
  START,
  END
}

export function baseParse(content: string) {
  const context = createParseContext(content);
  return createRoot(parseChildren(context, ''))
}

function createRoot(children) {
  return {
    children
  }
}

function parseChildren(context, parentTag) {
  const nodes: any = [];
  while (!isEnd(context, parentTag)) {
    let node;
    const s = context.source;
    if (s.startsWith("{{")) {
      node = parseInterpolation(context);
    } else if (s[0] === ("<")) {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context);
      }
    }
    if (!node) {
      node = parseText(context);
    }
    nodes.push(node);
  }
  return nodes
}

function isEnd(context, parentTag) {
  if (parentTag && context.source.startsWith(`</${parentTag}>`)) {
    return true;
  }
  return !context.source
}

function parseText(context) {
  
  let endIndex = context.source.length;
  let endToken = "{{";
  const index = context.source.indexOf(endToken)
  if (index !== -1) {
    endIndex = index;
  }
  const content = parseTextData(context, endIndex);
  console.log(content, 'content')
  return {
    type: NodeTypes.TEXT,
    content
  }
};

function parseElement(context) {
  // 1. 解析tag
  // 2. 删除处理完成的代码
  const element: any = parseTag(context, TagType.START);
  element.children = parseChildren(context, element.tag);
  parseTag(context, TagType.END);
  return element;
}

function parseTag(context, type: TagType) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];
  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagType.END) return;
  return {
    type: NodeTypes.ELEMENT,
    tag
  }
}

function parseInterpolation(context) {
  const openDelimiter = "{{";
  const closeDelimiter = "}}";
  const closedIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);

  advanceBy(context, openDelimiter.length);
  const rawContentLength = closedIndex - openDelimiter.length;
  const rawContent = parseTextData(context, rawContentLength);
  const content = rawContent.trim();

  advanceBy(context, closeDelimiter.length);

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

function parseTextData(context, length) {
  const content = context.source.slice(0, length);
  advanceBy(context, length);
  return content
}
