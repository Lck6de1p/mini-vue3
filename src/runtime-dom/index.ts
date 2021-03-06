import { createRenderer } from '../runtime-core'


function createElement(type) {
  return document.createElement(type)
}


function patchProp(el, key, oldVal, val) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLocaleLowerCase();
    el.addEventListener(event, val)
  } else {
    if (val === undefined || val === null) {
      el.removeAttribute(key, val);
    } else {
      el.setAttribute(key, val);
    }
  }
}

function insert(child, parent, anchor = null) {
  parent.insertBefore(child, anchor)

}
function remove(child) {
  const parent = child.parentNode;
  if (parent) {
    parent.removeChild(child);
  }
}

function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  remove,
  setElementText,
  insert
})


export function createApp(...arg) {
  return renderer.createApp(...arg);
}

export * from '../runtime-core';
