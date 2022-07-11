import { h, ref } from "../../lib/guide-mini-vue.esm.js";

const arrayDom = [h("div", {}, "A"), h("div", {}, "B")];

const textDom = [h("div", {}, "B"), h("div", {}, "A")];

export const array2Array = {
  name: "array2Array",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    return this.isChange === true ? h("div", {}, textDom) : h("div", {}, arrayDom);
  },
};
