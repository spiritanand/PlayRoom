export function getSumOfArray(arr) {
  return arr?.length
		 ? arr.reduce((sum, currentValue) => sum + currentValue)
		 : 0;
}