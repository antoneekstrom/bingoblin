
/**
 * 
 */
export type Range = [from: number, to: number]

/**
 * 
 * @param r 
 * @returns
 */
export function rangeLen(r: Range): number {
   return r[1] - r[0]
}

/**
 * 
 * @param a 
 * @param b 
 * @template T
 * @returns
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
   if (a !== b && (a == undefined || b == undefined)) return false
   if (a === b) return true
   if (a.length != b.length) return false
   return a.reduce<boolean>((eq, c, i) => eq && c == b[i], true)
}

/**
 * 
 * @param arr 
 * @template T
 * @returns
 */
export function pickRandom<T>(arr: T[]): T {
   return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 
 * @param to 
 * @param from 
 * @returns
 */
export function range(to: number, from = 0) {
   return [...new Array(to)].map((_val, i) => i + from)
}

/**
 * 
 * @param arr 
 * @param range 
 * @returns
 */
export function splitRange<T>(arr: T[], range: [start: number, end: number]): [start: T[], end: T[]] {
   return [ arr.slice(0, range[0]), arr.slice(range[1], arr.length) ]
}

/**
 * 
 * @param array 
 * @returns
 */
export function shuffle<T>(arr: T[]): T[] {
   const copy = [ ...arr ]

   for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = copy[i]
      copy[i] = copy[j]
      copy[j] = temp
   }
   
   return copy
}