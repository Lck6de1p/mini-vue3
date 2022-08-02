export * from './toDisplayString';

export const extend = Object.assign;

export const EMPTY_OBJ = {};

export const isObject = (e) => {
  return e !== null && typeof e === 'object'
}

export const isString = (e) => typeof e === 'string'

export const hasChanged = (newValue, oldValue) => {
  return !Object.is(newValue, oldValue)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toLocaleUpperCase() : "";
  })
}

export const capitalize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ""
}