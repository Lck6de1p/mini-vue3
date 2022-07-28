import { NodeTypes } from "../src/ast";
import { baseParse } from "../src/parse";

describe('Parse', () => {
  describe('interpolation', () => {
    test('simple interpolation', () => {
      const ast = baseParse("{{ message }}");

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: "message",
        }
      })
    })
  })

  describe('element', () => {
    test('simple element div', () => {
      const ast = baseParse("<div></div>");

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: "div"
      })
    })

  })

  describe('text', () => {
    test('simple text', () => {
      const ast = baseParse("this is a text");

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.TEXT,
        content: "this is a text"
      })
    })
  })

  test.only("happy path", () => {
    const ast = baseParse("<div>hello,{{message}}</div>");
    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ELEMENT,
      tag: "div",
      children: [
        {
          type: NodeTypes.TEXT,
          content: "hello,"
        },
        {
          type: NodeTypes.INTERPOLATION,
          content: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: "message",
          }
        }
      ]
    })
  })
})