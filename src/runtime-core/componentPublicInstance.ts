import { hasOwn } from "../shared/index";

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slot: (i) => i.slots,
  $props: (i) => i.props
};

export const PublicInstanceProxyHandles = {
  get({ _: instance }, key) {
    const { setupState, props } = instance;
    // if (key in setupState) {
    //   return setupState[key];
    // }
    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }
    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
