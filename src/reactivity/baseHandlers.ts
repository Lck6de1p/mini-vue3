import { track, trigger } from "./effect";
import { reactive, ReactiveFlag, readonly } from "./reactive";
import { isObject } from "./shared";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
function createGetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlag.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlag.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);

    // res 是不是obj
    if(isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  }
}
export const mutableHandlers = {
  get,
  set,
}
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败 因为 target 是 readonly`, target)
    return true;
  }
}