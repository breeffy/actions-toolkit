import { getEnvironmentVariable } from './utils'

export interface StateType { [key: string]: string | undefined }

export function createStateProxy <S extends StateType = StateType>() {
  return new Proxy<S>({} as S, {
    get (_, name: string) {
      // When we attempt to get `states.___`, instead
      // we call `getEnvironmentVariable`.
      return getEnvironmentVariable('state', name)
    },
    getOwnPropertyDescriptor() {
      // We need to overwrite this to ensure that
      // keys are enumerated
      return {
        enumerable: true,
        configurable: true,
        writable: false
      }
    },
    ownKeys () {
      const keys = Object.keys(process.env)
      const filtered = keys.filter(key => key.startsWith('STATE_'))
      return filtered
    }
  })
}