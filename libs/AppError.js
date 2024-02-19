exports.AppError = class AppError extends Error {
    constructor(name, message, status) {
        super(message);
        this.name = name;
        this.status = status;
    }
}