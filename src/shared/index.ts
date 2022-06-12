export const extend =  Object.assign;

export const isObject = (e) => {
  return e !== null && typeof e === 'object'
}

export const hasChanged = (newValue, oldValue) => {
  return !Object.is(newValue, oldValue)
}