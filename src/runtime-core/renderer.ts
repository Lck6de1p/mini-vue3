// import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setUpComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  // 方便后续递归
  patch(vnode, container);
}

function patch(vnode, container) {
  const { shapeFlag } = vnode;
  // debugger


  if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 处理组件
    processComponent(vnode, container);
  } else if (shapeFlag & ShapeFlags.ELEMENT) {
    // 处理element
    processElement(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {

  const el = (vnode.el = document.createElement(vnode.type));

  const { children, shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }
  // props

  const { props } = vnode;
  for (const key in props) {
    const val = props[key];

    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase();
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  
  const instance = createComponentInstance(vnode);
  setUpComponent(instance);

  setupRenderEffect(instance, vnode, container);
}

function setupRenderEffect(instance, vnode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> element -> mountElement
  patch(subTree, container);

  // 所有element mount
  vnode.el = subTree.el;
}
