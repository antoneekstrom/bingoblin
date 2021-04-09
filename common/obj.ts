

/**
 * 
 * @param obj 
 * @returns 
 */
 export function omitUndefined<T, K extends (keyof T)[]>(obj: T): Omit<T, keyof K> {
   return omitSome(obj, (_, value) => value == undefined)
}

/**
 * 
 * @param obj 
 * @param keys 
 * @returns 
 */
export function omitKeys<T, K extends (keyof T)[]>(obj: T, ...keys: K): Omit<T, keyof K> {
   return omitSome(obj, key => keys.includes(key))
}

/**
 * 
 * @param obj 
 * @param predicate 
 * @returns 
 */
export function omitSome<T, K extends (keyof T)[]>(obj: T, predicate: (key: keyof T, value: unknown) => boolean): Omit<T, keyof K> {
   return Object.entries(obj).reduce<T>((r, [key, value]) => !predicate(key as keyof T, value) ? {...r, [key]: value} : r, {} as T)
}