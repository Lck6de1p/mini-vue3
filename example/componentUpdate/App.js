import { h, ref } from "../../lib/guide-mini-vue.esm.js";
const Child = {
  setup() {},
  render() {
    return h("div", {}, [h("div", {}, `child: ${this.$props.msg}`)]);
  },
};

export const App = {
  setup() {
    const msg = ref(123);
    const count = ref(1)
    const handleClick = () => {
      msg.value = 456;
    };
    const handleClick1 = () => {
      count.value++;
    };
    return {
      msg,
      handleClick,
      handleClick1,
      count
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("div", {}, [
          h("p", {}, `${this.msg},${this.count}` ),
          h("button", { onClick: this.handleClick }, "修改子组件的props"),
          h("button", { onClick: this.handleClick1 }, "修改子组件无关的props"),
        ]),

        h(Child, { msg: this.msg }),
      ]
    );
  },
};
