import { h, ref, getCurrentInstance, nextTick } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  setup() {
    const count = ref(0);
    const instance = getCurrentInstance()
    const handleClick = () => {
      for (let i = 0; i < 100; i++) {
        count.value = i;

      }
      console.log(instance.vnode.el.innerHTML)
      nextTick(() => {
        console.log(instance.vnode.el.innerHTML)
      })
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
