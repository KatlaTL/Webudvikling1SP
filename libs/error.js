exports.error = (name = "", message = "", status = "") => {
    let error = new Error();
    error.name = name;
    error.message = message;
    error.status = status;
    return error;
}