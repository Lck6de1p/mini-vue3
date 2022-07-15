import { h, ref } from "../../lib/guide-mini-vue.esm.js";

// // 新的比老的多 后
// const arrayDom1 = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// const arrayDom2 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ];

// 新的比老的多 前
// const arrayDom1 = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// const arrayDom2 = [
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
// ];

// // 新的比老的少 后
// const arrayDom2 = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// const arrayDom1 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ];

// 新的比老的少 后
const arrayDom2 = [h("div", { key: "C" }, "C"), h("div", { key: "D" }, "D")];

const arrayDom1 = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "C" }, "C"),
  h("div", { key: "D" }, "D"),
];

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
    return h("div", {}, this.isChange === true ? arrayDom2 : arrayDom1);
  },
};
