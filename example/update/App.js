import { h, ref } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  setup() {
    const count = ref(0);

    const handleClick = () => {
      count.value++;
      console.log("count.value:", count.value);
    };

    return {
      count,
      handleClick,
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("div", {}, "count: " + this.count),
        h("button", { onClick: this.handleClick }, "click"),
      ]
    );
  },
};
