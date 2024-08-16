export function getRandom<T>(array: T[]): T {
    return array[Math.floor(array.length*Math.random())];
}