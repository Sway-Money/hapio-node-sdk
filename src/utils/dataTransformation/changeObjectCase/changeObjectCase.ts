import { camelCase, snakeCase } from 'change-case'

type TransformFunc = typeof camelCase | typeof snakeCase
type Obj = Record<any, any>

const isObject = (value: unknown) =>
  value && (typeof value === 'object' || typeof value === 'function')

const isArray = (value: unknown) =>
  Array.isArray(value) ||
  Object.prototype.toString.call(value) === '[object Array]'

const transformArray = (array: any[], f: TransformFunc): any[] =>
  array.map((value) => computeNewValue(value, f))

const transformObjectKeys = (object: Obj, f: TransformFunc) =>
  Object.keys(object).reduce((acc, key) => {
    if (key in object) {
      const value = object[key]
      acc[f(key)] = computeNewValue(value, f)
    }
    return acc
  }, {} as Obj)

const makeArbitraryDataTransformation = (f: TransformFunc) => (data: any) => {
  if (isArray(data)) {
    return transformArray(data, f)
  } else if (isObject(data)) {
    return transformObjectKeys(data, f)
  } else {
    return data
  }
}

const computeNewValue = (value: any, f: TransformFunc) => {
  const valueIsArray = isArray(value)

  if (valueIsArray) {
    return transformArray(value, f)
  } else if (!(value instanceof Date) && isObject(value) && !valueIsArray) {
    return transformObjectKeys(value, f)
  }

  return value
}

export const camelKeys = makeArbitraryDataTransformation(camelCase)
export const snakeKeys = makeArbitraryDataTransformation(snakeCase)
