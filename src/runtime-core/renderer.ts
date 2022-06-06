import { isObject } from "../reactivity/shared/index";
import { createComponentInstance, setUpComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  // 方便后续递归
  patch(vnode, container);
}

function patch(vnode, container) {
  if (isObject(vnode.type)) {
    // 处理组件
    processComponent(vnode, container);
  } else {
    // 处理element
    processElement(vnode, container);
  }

}

function processElement(vnode, container) {
  mountElement(vnode, container);
}
function mountElement(vnode, container) {
  const el = document.createElement(vnode.type);
  const { children, props } = vnode;
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, container)
  }
  // props
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val);
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container);
  })
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);
  console.log(instance, 'instance')
  setUpComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();

  // vnode -> element -> mountElement
  patch(subTree, container);
}
