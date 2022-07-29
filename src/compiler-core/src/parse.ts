import { NodeTypes } from "./ast";

const enum TagType {
  START,
  END
}

export function baseParse(content: string) {
  const context = createParseContext(content);
  return createRoot(parseChildren(context, []))
}

function createRoot(children) {
  return {
    children
  }
}

function parseChildren(context, ancestors) {
  const nodes: any = [];
  while (!isEnd(context, ancestors)) {
    let node;
    const s = context.source;
    if (s.startsWith("{{")) {
      node = parseInterpolation(context);
    } else if (s[0] === ("<")) {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors);
      }
    }
    if (!node) {
      node = parseText(context);
    }
    nodes.push(node);
  }
  return nodes
}

function isEnd(context, ancestors) {

  const s = context.source;
  if (s.startsWith("</")) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag;
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }
  return !s;
  // if (parentTag && context.source.startsWith(`</${parentTag}>`)) {
  //   return true;
  // }
  // return !context.source
}

function parseText(context) {

  let endIndex = context.source.length;
  let endTokens = ["{{", '</'];
  for (const endToken of endTokens) {
    const index = context.source.indexOf(endToken)
    if (index !== -1 && index < endIndex) {
      endIndex = index;
    }
  }

  const content = parseTextData(context, endIndex);
  console.log(content, 'content')
  return {
    type: NodeTypes.TEXT,
    content
  }
};

function parseElement(context, ancestors) {
  // 1. 解析tag
  // 2. 删除处理完成的代码
  const element: any = parseTag(context, TagType.START);
  ancestors.push(element);
  element.children = parseChildren(context, ancestors);
  ancestors.pop();
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.END);
  } else {
    throw Error(`缺少结束标签：${element.tag}`)
  }
  return element;
}

function startsWithEndTagOpen(source, tag) {
  return source.startsWith('</') && source.slice(2, 2 + tag.length) === tag;
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
