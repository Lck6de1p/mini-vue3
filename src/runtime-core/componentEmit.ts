import { camelize, toHandlerKey } from "../shared/index";

export function emit(instance, event: string, ...arg) {
  console.log('event', event)

  const { props } = instance;


  // add -> Add
  // add-foo -> addFoo


  const handlerName = toHandlerKey(camelize(event));
  const handler = props[handlerName];

  handler && handler(...arg);
}