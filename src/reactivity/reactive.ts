import { mutableHandlers, readonlyHandlers } from './baseHandlers';
import { track, trigger } from './effect';

export const enum ReactiveFlag  {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly"
}
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

export function isReactive(value) {
  return !!value[ReactiveFlag.IS_REACTIVE];
}

export function isReadonly(value) {
  return  !!value[ReactiveFlag.IS_READONLY];
}
function createActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}

