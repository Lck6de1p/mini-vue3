
export function transform(root, options = {}) {
  const context = createTransformContext(root, options)
  traverseNode(root, context);
  createRootCodegen(root);
}

function traverseNode(node: any, context) {

  const nodeTransforms = context.nodeTransforms;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform(node);
  }
  console.log(node);

  traverseChildren(node, context);
}

function traverseChildren(node, context) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i]
      traverseNode(node, context);
    }
  }
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || []
  }
  return context;
}
function createRootCodegen(root: any) {
  root.codegenNode = root.children[0]
}

