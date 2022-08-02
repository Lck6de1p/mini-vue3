import { generate } from "../src/codegen";
import { baseParse } from "../src/parse"
import { transform } from "../src/transform";
import { transformElement } from "../src/transforms/transformElement";
import { transformExpression } from "../src/transforms/transformExpression";
import { transformText } from "../src/transforms/transformText";



describe('codegen', () => {
  it('string', () => {
    const ast = baseParse('hi');

    transform(ast);
    const { code } = generate(ast);

    expect(code).toMatchInlineSnapshot(`
"
return function render(_ctx, _cache){return 'hi'}"
`)
  })

  it('interpolation', () => {
    const ast = baseParse("{{message}}");
    console.log(ast);
    transform(ast, {
      nodeTransforms: [transformExpression]
    });
    const { code } = generate(ast);
    expect(code).toMatchInlineSnapshot(`
"const { toDisplayString: _toDisplayString } = Vue
return function render(_ctx, _cache){return _toDisplayString(_ctx.message)}"
`)
  })


  it('element',
    () => {
      const ast: any = baseParse("<div>hi, {{message}}</div");
      transform(ast, {
        nodeTransforms: [transformExpression, transformElement, transformText]
      });
      const { code } = generate(ast);
      expect(code).toMatchInlineSnapshot(`
"const { toDisplayString: _toDisplayString, createElementVNode: _createElementVNode } = Vue
return function render(_ctx, _cache){return _createElementVNode('div', null, 'hi, ' + _toDisplayString(_ctx.message))}"
`)
    })
})