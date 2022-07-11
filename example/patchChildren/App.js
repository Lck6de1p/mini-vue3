import { h, ref } from "../../lib/guide-mini-vue.esm.js";
import { array2Text } from "./array2Text.js";
import { text2Text } from "./text2Text.js";
import { text2Array } from "./text2Array.js";
import { array2Array } from "./array2Array.js";
export const App = {
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
  render() {
    return h("div", {}, [
      h(array2Array),
      // h(text2Array),
      // h(text2Text),
      // h(array2Text)
    ]);
  },
};
