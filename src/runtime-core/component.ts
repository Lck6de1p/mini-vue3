import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandles } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {}
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}

export function setUpComponent(instance) {
  initProps(instance, instance.vnode.props);
  // initSlots();
  setupStateForComponent(instance);
}

function setupStateForComponent(instance) {
  const Component = instance.type;
  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandles);
  const { setup } = Component;

  if (setup) {
    // function object
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    });

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult) {
  // function object
  // TODO function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  finishComponentsSetUp(instance);
}

function finishComponentsSetUp(instance) {
  const Component = instance.type;

  instance.render = Component.render;
}
