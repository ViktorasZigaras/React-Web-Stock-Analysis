export const multiplyNumbers = (a, b, afterComma = 2) => {
    return Number(a * b).toFixed(afterComma);}

export const substractNumbers = (a, b, afterComma = 2) => {
    return Number(a - b).toFixed(afterComma);}

export const percentDivisionNumbers = (a, b, afterComma = 2) => {
    return Number((a/b) * 100).toFixed(afterComma);}

export const convertNumbers = (a, afterComma = 2) => {
    return Number(a).toFixed(afterComma);}

export const addNumbers = (a, b, afterComma = 2) => {
    return Number(Number(a) + Number(b)).toFixed(afterComma);}

export const removeAndAddNumbers = (a, b, c, afterComma = 2) => {
    return Number(a - b + Number(c)).toFixed(afterComma);}