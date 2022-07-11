import { h, ref } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  setup() {
    const count = ref(0);

    const handleClick = () => {
      count.value++;
      console.log("count.value:", count.value);
    };

    const props = ref({
      foo: "foo",
      bar: "bar",
    });

    const handleClick1 = () => {
      props.value.foo = "new-foo";
    };
    const handleClick2 = () => {
      props.value.bar = undefined;
    };
    const handleClick3 = () => {
      props.value = {foo: "new-foo"};
    };

    return {
      count,
      handleClick,
      props,
      handleClick1,
      handleClick2,
      handleClick3,
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        ...this.props
      },
      [
        h("div", {}, "count: " + this.count),
        h("button", { onClick: this.handleClick }, "click"),
        h("button", { onClick: this.handleClick1 }, "修改props"),
        h(
          "button",
          { onClick: this.handleClick2 },
          "修改props中的value为undefined"
        ),
        h("button", { onClick: this.handleClick3 }, "删除props"),
      ]
    );
  },
};
