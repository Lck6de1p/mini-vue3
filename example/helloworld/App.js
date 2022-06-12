import { h } from "../../lib/guide-mini-vue.esm.js";

window.self = null;
export const App = {
  render() {
    window.self = this;
    // ui
    return h(
      "div",
      {
        id: "root",
        onClick() {
          console.log('click')
        },
        onMousedown() {
          console.log('mouseDown')
        },
      },
      [
        h("p", { id: "p", class: ["blue", "big"] }, "蓝色"),
        h("p", { id: "p", class: ["red"] }, "hi" + this.msg),
      ]
    );
  },
  setup() {
    return {
      msg: "mini - vue",
    };
  },
};
