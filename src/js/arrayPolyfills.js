/**
 * This module contains polyfills for Arrays
 */
/* -1- Polyfill for [findLastIndex]
 * finsLastIndex returns the last index at which a given object can be found in the array of objects
 */
Array.prototype && function (ArrayPrototype) {
    ArrayPrototype.findLastIndex = ArrayPrototype.findLastIndex ||
        function (array, cbFunc) {
            if (!array) return -1;
            if (!cbFunc || typeof cbFunc !== "function") throw TypeError(`${cbFunc} is not a function`);
            return array.reduceRight((prev, currentValue, currentIndex) => {
                if (prev > -1) return prev;
                if (cbFunc(currentValue, currentIndex)) return currentIndex;
                return -1;
            }, -1);
        }
}(Array.prototype);
