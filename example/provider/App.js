import { h, provider, inject } from "../../lib/guide-mini-vue.esm.js";

const Provider = {
  name: "Provider",
  setup() {
    provider("a", "ProviderA");
    provider("b", "ProviderA");
  },
  render() {
    return h("div", {}, [h("div", {}, "Provider"), h(Consumer)]);
  },
};

const Consumer = {
  name: "Consumer",
  setup() {
    provider("a", "ProviderATwo");
    const injectA = inject("a");
    const injectB = inject("b");
    return {
      injectA,
      injectB,
    };
  },
  render() {
    return h("div", {}, [
      h("div", {}, `Consumer${this.injectA} + ${this.injectB}`),
      h(Consumer2),
    ]);
  },
};

const Consumer2 = {
  name: "Consumer2",
  setup() {
    const injectA = inject("a");
    const injectB = inject("b");
    const injectC = inject("c", "defaultVal");
    const injectFn = inject("c", () => "defaultVal");
    return {
      injectA,
      injectB,
      injectC,
      injectFn,
    };
  },
  render() {
    return h(
      "div",
      {},
      `Consumer2${this.injectA} + ${this.injectB}+  ${this.injectC} + ${this.injectFn}`
    );
  },
};

export const App = {
  name: "App",
  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [h(Provider)]
    );
  },
  setup() {
    return {
      msg: "mini - vue",
    };
  },
};
