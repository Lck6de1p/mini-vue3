import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
window.self = null;
export const App = {
  render() {
    window.self = this;
    // ui
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("div", {}, "hi, " + this.msg),
        h(Foo, {
          onAdd(a, b) {
            console.log("onAdd", a, b);
          },
          onAddFoo() {
            console.log('onAddFoo')
          }
        }),
      ]
    );
  },
  setup() {
    return {
      msg: "mini - vue",
    };
  },
};
