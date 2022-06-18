
import { createVNode } from "./vnode";

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先转化为vnode
        // 逻辑操作基于vnode处理
        const vnode = createVNode(rootComponent);

        render(vnode, rootContainer);
      }
    }
  }
}

