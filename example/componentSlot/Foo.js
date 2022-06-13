import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    console.log(this.$slot);
    const age = 20
    return h("div", {}, [
      renderSlots(this.$slot, "header", {
        age
      }),
      foo,
      renderSlots(this.$slot, "footer"),
    ]);
  },
};
