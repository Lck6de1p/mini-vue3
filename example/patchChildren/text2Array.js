import { h, ref } from "../../lib/guide-mini-vue.esm.js";

const arrayDom = [h("div", {}, "A"), h("div", {}, "B")];

const textDom = "textDom";

export const text2Array = {
  name: "text2Array",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    return !this.isChange === true ? h("div", {}, textDom) : h("div", {}, arrayDom);
  },
};
