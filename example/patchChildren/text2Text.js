import { h, ref } from "../../lib/guide-mini-vue.esm.js";

const arrayDom = "prevTextDom";

const textDom = "newTextDom";

export const text2Text = {
  name: "text2Text",
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
