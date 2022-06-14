import { h, createTextNode, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h("p", {}, "header" + age),
          createTextNode("createTextNode"),
        ],
        footer: () => h("p", {}, "footer"),
      }
    );
    // ui
    return h(
      "div",
      {
        id: "root",
      },
      [foo, app]
    );
  },
  setup() {
    const instance = getCurrentInstance();
    console.log("app", instance)
    return {
      msg: "mini - vue",
    };
  },
};
