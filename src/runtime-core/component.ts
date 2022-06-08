import { PublicInstanceProxyHandles } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
  };
  return component;
}

export function setUpComponent(instance) {
  // initProps();
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
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult) {
  // function object
  // TODO function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }
  console.log(instance, "e");
  finishComponentsSetUp(instance);
}

function finishComponentsSetUp(instance) {
  const Component = instance.type;

  instance.render = Component.render;
}
