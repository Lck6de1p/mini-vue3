import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  render() {
    // ui
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("p", { id: "p", class: ["blue", "big"] }, "蓝色"),
        h("p", { id: "p", class: ["red"] }, "红色"),
      ]
    );
  },
  setup() {
    return {
      msg: "mini - vue",
    };
  },
};
