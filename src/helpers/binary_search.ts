/**
 * Realiza uma busca binária no array
 * @param array array no qual será feita a busca
 * @param val valor buscado
 * @returns retorna -1 caso não encontre o elemento, caso contrário retorna o
 * menor indice tal que array[indice] == val
 */
export function binarySearch<T>(array: T[], val: T): number {
  let start = 0;
  let end = array.length;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (array[mid] === val) {
      return mid;
    }
    if (array[mid] > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}
