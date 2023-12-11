exports.error = (name = "", message = "") => {
    let error = new Error();
    error.name = name;
    error.message = message
    return error
}