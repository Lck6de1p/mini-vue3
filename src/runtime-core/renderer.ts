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
    mountChildren(n2.children, container, parent);
  }

  function processTextNode(n1, n2: any, container: any) {
    const text = (n2.el = document.createTextNode(n2.children))
    container.append(text);
  }

  function processElement(n1, n2, container, parent) {
    if (!n1) {
      mountElement(n2, container, parent);

    } else {
      patchElement(n1, n2, container, parent);
    }
  }
  function patchElement(n1, n2, container, parent) {
    console.log(n1, n2)
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    const el = (n2.el = n1.el);
    patchChildren(n1, n2, container, parent);
    patchProps(el, oldProps, newProps);
  }
  function patchChildren(n1, n2, container, parent) {
    // TODO 更新element children节点
    console.log(n1, n2)
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
      } else {
        unMountElement(c1);
      }
      mountChildren(c2, container, parent)
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
  function mountElement(vnode, container, parent) {

    // const el = (vnode.el = document.createElement(vnode.type));
    const el = (vnode.el = hostCreateElement(vnode.type));

    const { children, shapeFlag } = vnode;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode.children, el, parent);
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

  function mountChildren(children, container, parent) {
    children.forEach((v) => {
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