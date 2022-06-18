import { createRenderer } from '../runtime-core'


function createElement(type) {
  return document.createElement(type)
}


function patchProp(el, key, val) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLocaleLowerCase();
    el.addEventListener(event, val)
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, container) {
  container.append(el);
}


const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert
})


export function createApp(...arg) {
  return renderer.createApp(...arg);
}

export * from '../runtime-core';
