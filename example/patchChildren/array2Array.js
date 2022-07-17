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
// const arrayDom2 = [h("div", { key: "C" }, "C"), h("div", { key: "D" }, "D")];

// const arrayDom1 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ];

// 对比中间

// const arrayDom1 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C", id: "prev" }, "C"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "F" }, "F"),
// ];
// const arrayDom2 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "E" }, "E"),

//   h("div", { key: "C", id: "next" }, "C"),
//   h("div", { key: "F" }, "F"),
// ];

// const arrayDom1 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C", id: "prev" }, "C"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "F" }, "F"),
// ];
// const arrayDom2 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "C", id: "next" }, "C"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "F" }, "F"),
// ];

// a,b,(c,e),f,g
// a,b,(e,c,d),f,g
// const arrayDom1 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C"}, "C"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "F" }, "F"),
//   h("div", { key: "G" }, "G"),

// ];
// const arrayDom2 = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "F" }, "F"),
//   h("div", { key: "G" }, "G"),

// ];

// a,b,(c,d,e,z),f,g
// a,b,(d,c,y,e),f,g

const arrayDom1 = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "C" }, "C"),
  h("div", { key: "D" }, "D"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "Z" }, "Z"),
  h("div", { key: "F" }, "F"),
  h("div", { key: "G" }, "G"),
];
const arrayDom2 = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "D" }, "D"),
  h("div", { key: "C" }, "C"),
  h("div", { key: "Y" }, "Y"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "F" }, "F"),
  h("div", { key: "G" }, "G"),
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
