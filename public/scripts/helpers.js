//Debounce function to prevent a function from being invoked mulitiple times in a row
const debounce = (func, wait = 250) => {
    let timeoutID = null;
    return (...args) => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            func(...args);
        }, wait);
    }
}