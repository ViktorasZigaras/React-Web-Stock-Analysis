function multiplyNumbers(a, b, afterComma) {
    return Number(a * b).toFixed(afterComma);
}

function substractNumbers(a, b, afterComma) {
    return Number(a - b).toFixed(afterComma);
}

function percentDivisionNumbers(a, b, afterComma) {
    return Number((a/b) * 100).toFixed(afterComma);
}

function convertNumbers(a, afterComma) {
    return Number(a).toFixed(afterComma);
}

function addNumbers(a, b, afterComma) {
    return Number(Number(a) + Number(b)).toFixed(afterComma);
}

function removeAndAddNumbers(a, b, c, afterComma) {
    return Number(a - b + Number(c)).toFixed(afterComma);
}

export {
    multiplyNumbers, 
    substractNumbers, 
    percentDivisionNumbers, 
    convertNumbers, 
    addNumbers,
    removeAndAddNumbers
};