import {
  h,
  renderSlots,
  getCurrentInstance,
} from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  name: "foo",
  setup() {
    const instance = getCurrentInstance();
    console.log("foo", instance);
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    console.log(this.$slot);
    const age = 20;
    return h("div", {}, [
      renderSlots(this.$slot, "header", {
        age,
      }),
      foo,
      renderSlots(this.$slot, "footer"),
    ]);
  },
};
