import { createComponentInstance, setUpComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  // 方便后续递归
  patch(vnode, container);
}

function patch(vnode, container) {
  // TODO 判断vnode是不是element

  // 是element
  processElement();

  // 处理组件
  processComponent(vnode, container);
}

function processElement() {
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);
  setUpComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();

  // vnode -> element -> mountElement
  patch(subTree, container);
}
