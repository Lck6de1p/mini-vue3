import { NodeTypes } from "../src/ast";
import { baseParse } from "../src/parse"
import { transform } from "../src/transform";


describe('transform', () => {
  test('happy path', () => {
    const ast = baseParse('<div>hi,{{message}}</div>');

    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT) {
        node.content = 'hi,mini-vue';
      }
    }

    transform(ast, {
      nodeTransforms: [plugin]
    });
    
    const nodeText = ast.children[0].children[0];
    expect(nodeText.content).toBe('hi,mini-vue');

  })
})