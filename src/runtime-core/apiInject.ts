import { getCurrentInstance } from "./component";

export function provider(key, value) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    let { providers } = currentInstance;

    const parentProvides = currentInstance.parent.providers;

    if (providers === parentProvides) {
      providers = currentInstance.providers = Object.create(parentProvides)
    }
    providers[key] = value;

  }
}
export function inject(key, defaultVal) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    const parentProvides = currentInstance.parent.providers;
    if (key in parentProvides) {

      return parentProvides[key];
    } else if (defaultVal) {
      if (typeof defaultVal === 'function') {
        return defaultVal()
      }
      return defaultVal
    }
  }

}