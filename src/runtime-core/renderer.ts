// import { isObject } from "../shared/index";
import { effect } from "../reactivity/effect";
import { EMPTY_OBJ } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setUpComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";


export function createRenderer(options) {
  const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert } = options;

  function render(vnode, container) {
    // 调用patch方法
    // 方便后续递归
    patch(null, vnode, container, null);
  }

  function patch(n1, n2, container, parent) {
    const { shapeFlag, type } = n2;
    // debugger

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parent);
        break;
      case Text:
        processTextNode(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理组件
          processComponent(n1, n2, container, parent);
        } else if (shapeFlag & ShapeFlags.ELEMENT) {
          // 处理element
          processElement(n1, n2, container, parent);
        }
        break;
    }

  }

  function processFragment(n1, n2: any, container: any, parent) {
    mountChildren(n2, container, parent);
  }

  function processTextNode(n1, n2: any, container: any) {
    const text = (n2.el = document.createTextNode(n2.children))
    container.append(text);
  }

  function processElement(n1, n2, container, parent) {
    if (!n1) {
      mountElement(n2, container, parent);

    } else {
      patchElement(n1, n2, container);
    }
  }
  function patchElement(n1, n2, container) {
    console.log(n1, n2)
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    const el = (n2.el = n1.el);
    patchProp(el, oldProps, newProps);
  }

  function patchProp(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const newProp = newProps[key];
        const oldProp = oldProps[key];
        if (newProp !== oldProp) {
          hostPatchProp(el, key, oldProp, newProp);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  };
  function mountElement(vnode, container, parent) {

    // const el = (vnode.el = document.createElement(vnode.type));
    const el = (vnode.el = hostCreateElement(vnode.type));

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


      hostPatchProp(el, key, null, val);
    }

    // container.append(el);
    hostInsert(el, container);
  }

  function mountChildren(vnode, container, parent) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parent);
    });
  }

  function processComponent(n1, n2: any, container: any, parent) {
    mountComponent(n2, container, parent);
  }

  function mountComponent(vnode: any, container, parent) {

    const instance = createComponentInstance(vnode, parent);
    setUpComponent(instance);

    setupRenderEffect(instance, vnode, container);
  }

  function setupRenderEffect(instance, initialVNode, container) {

    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = instance.subTree = instance.render.call(proxy);

        console.log(subTree)
        // vnode -> element -> mountElement
        patch(null, subTree, container, instance);
        // 所有element mount
        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        console.log('update')
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;

        console.log('current', subTree)
        console.log('prev', prevSubTree)
        // vnode -> element -> mountElement
        patch(prevSubTree, subTree, container, instance);

      }

    })

  }

  return {
    createApp: createAppAPI(render)
  }
}