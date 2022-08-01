import { CREATE_ELEMENT_VNODE } from "./runtimeHelpers";

export const enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  TEXT,
  ROOT,
  COMPOUND_EXPRESSION
}


export function createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren) {
  context.helper(CREATE_ELEMENT_VNODE);

  return {
      type: NodeTypes.ELEMENT,
      tag: vnodeTag,
      props: vnodeProps,
      children: vnodeChildren
  }
}