import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转化为vnode
      // 逻辑操作基于vnode处理
      const vnode = createVNode(rootContainer);

      render(vnode, rootContainer);
    }
  }
}

