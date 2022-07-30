export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;

  push('return ');

  const functionName = 'render';
  const args = ["_ctx", "_cache"];
  const signature = args.join(', ');
  push(`function ${functionName}(${signature}){}`);
  push('return ');
  getNode(ast.codegenNode, context);
  return {
    code: `function render() {
    return 'hi'
  }`}
}

function createCodegenContext(): any {
  const context = {
    code: "",
    push(source) {
      context.code += source
    },
  };

  return context;
}

function getNode(node: any, context: any) {
  const {push} = context;
  push(`'${node.content}'`);
}
