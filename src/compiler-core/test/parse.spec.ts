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
        tag: "div",
        children: []
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

  test("happy path", () => {
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

  test("nested element", () => {
    const ast = baseParse("<div><p>hello,</p>{{message}}</div>");
    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ELEMENT,
      tag: "div",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "p",
          children: [
            {
              type: NodeTypes.TEXT,
              content: "hello,"
            },
          ],
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

  test('throw element tag error', () => {
    expect(() => {
      baseParse("<div><span></div>");
    }).toThrow(`缺少结束标签：span`)
  })
})

