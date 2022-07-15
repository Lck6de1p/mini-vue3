// import { isObject } from "../shared/index";
import { effect } from "../reactivity/effect";
import { EMPTY_OBJ } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setUpComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";


export function createRenderer(options) {
  const { createElement: hostCreateElement,
    patchProp: hostPatchProp,
    remove: hostRemove,
    setElementText: hostSetElementText,
    insert: hostInsert
  } = options;

  function render(vnode, container) {
    // 调用patch方法
    // 方便后续递归
    patch(null, vnode, container, null, null);
  }

  function patch(n1, n2, container, parent, anchor) {
    const { shapeFlag, type } = n2;
    // debugger

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parent, anchor);
        break;
      case Text:
        processTextNode(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理组件
          processComponent(n1, n2, container, parent, anchor);
        } else if (shapeFlag & ShapeFlags.ELEMENT) {
          // 处理element
          processElement(n1, n2, container, parent, anchor);
        }
        break;
    }

  }

  function processFragment(n1, n2: any, container: any, parent, anchor) {
    mountChildren(n2.children, container, parent, anchor);
  }

  function processTextNode(n1, n2: any, container: any) {
    const text = (n2.el = document.createTextNode(n2.children))
    container.append(text);
  }

  function processElement(n1, n2, container, parent, anchor) {
    if (!n1) {
      mountElement(n2, container, parent, anchor);

    } else {
      patchElement(n1, n2, container, parent, anchor);
    }
  }
  function patchElement(n1, n2, container, parent, anchor) {
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    const el = (n2.el = n1.el);
    patchChildren(n1, n2, container, parent, anchor);
    patchProps(el, oldProps, newProps);
  }
  function patchChildren(n1, n2, container, parent, anchor) {
    const prevShapeFlag = n1.shapeFlag;
    const nowShapeFlag = n2.shapeFlag;
    const c1 = n1.children;
    const c2 = n2.children;

    if (nowShapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unMountElement(c1);
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '');
        mountChildren(c2, container, parent, anchor)

      } else {
        // Array diff array
        patchKeyedChildren(c1, c2, container, parent, anchor)
      }
    }
  }

  function patchKeyedChildren(c1, c2, container, parent, parentAnchor) {
    let i = 0;
    let e1 = c1.length - 1;
    let e2 = c2.length - 1;

    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key
    };
    while (i <= e1 && i <= e2) {
      const n1 = c1[i], n2 = c2[i]
      if (isSameVNodeType(n1, n2)) {

        patch(n1, n2, container, parent, parentAnchor)
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1], n2 = c2[e2]
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, parent, parentAnchor)
      } else {
        break;
      }
      e1--;
      e2--;
    }

    console.log(i, e1, e2)
    // 新虚拟节点比老的多
    if (i > e1) {
      if (i <= e2) {
        const nextPos = i + 1
        const anchor = i + 1 < c2.length ? c2[nextPos].el : parentAnchor
        while (i <= e2) {
          patch(null, c2[i], container, parent, anchor)
          i++;
        }
      }
    }

    if (i > e2 && i <= e1) {
      while(i <= e1) {
        const el = c1[i].el
        hostRemove(el);
        i++;
      }
    }

  }
  function unMountElement(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el;
      hostRemove(el);
    }
  };
  function patchProps(el, oldProps, newProps) {
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
  function mountElement(vnode, container, parent, anchor) {

    // const el = (vnode.el = document.createElement(vnode.type));
    const el = (vnode.el = hostCreateElement(vnode.type));

    const { children, shapeFlag } = vnode;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode.children, el, parent, anchor);
    }
    // props

    const { props } = vnode;
    for (const key in props) {
      const val = props[key];


      hostPatchProp(el, key, null, val);
    }

    // container.append(el);
    hostInsert(el, container, anchor);
  }

  function mountChildren(children, container, parent, anchor) {
    children.forEach((v) => {
      patch(null, v, container, parent, anchor);
    });
  }

  function processComponent(n1, n2: any, container: any, parent, anchor) {
    mountComponent(n2, container, parent, anchor);
  }

  function mountComponent(vnode: any, container, parent, anchor) {

    const instance = createComponentInstance(vnode, parent);
    setUpComponent(instance);

    setupRenderEffect(instance, vnode, container, anchor);
  }

  function setupRenderEffect(instance, initialVNode, container, anchor) {

    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = instance.subTree = instance.render.call(proxy);

        // vnode -> element -> mountElement
        patch(null, subTree, container, instance, anchor);
        // 所有element mount
        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;

        // vnode -> element -> mountElement
        patch(prevSubTree, subTree, prevSubTree.el, instance, anchor);

      }

    })

  }

  return {
    createApp: createAppAPI(render)
  }
}