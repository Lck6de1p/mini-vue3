// import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setUpComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  // 调用patch方法
  // 方便后续递归
  patch(vnode, container, null);
}

function patch(vnode, container, parent) {
  const { shapeFlag, type } = vnode;
  // debugger

  switch (type) {
    case Fragment:
      processFragment(vnode, container, parent);
      break;
    case Text:
      processTextNode(vnode, container);
      break;
    default:
      if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        // 处理组件
        processComponent(vnode, container, parent);
      } else if (shapeFlag & ShapeFlags.ELEMENT) {
        // 处理element
        processElement(vnode, container, parent);
      }
      break;
  }


}

function processFragment(vnode: any, container: any, parent) {
  mountChildren(vnode, container, parent);
}

function processTextNode(vnode: any, container: any) {
  const text = (vnode.el = document.createTextNode(vnode.children))
  container.append(text);
}

function processElement(vnode, container, parent) {
  mountElement(vnode, container, parent);
}

function mountElement(vnode, container, parent) {

  const el = (vnode.el = document.createElement(vnode.type));

  const { children, shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parent);
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

function mountChildren(vnode, container, parent) {
  vnode.children.forEach((v) => {
    patch(v, container, parent);
  });
}

function processComponent(vnode: any, container: any, parent) {
  mountComponent(vnode, container, parent);
}

function mountComponent(vnode: any, container, parent) {

  const instance = createComponentInstance(vnode, parent);
  setUpComponent(instance);

  setupRenderEffect(instance, vnode, container);
}

function setupRenderEffect(instance, vnode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> element -> mountElement
  patch(subTree, container, instance);

  // 所有element mount
  vnode.el = subTree.el;
}


