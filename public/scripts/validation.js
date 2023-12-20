const insertMessage = (data) => {
    removeMessage();

    for (const [key, value] of Object.entries(data)) {
        const element = document.querySelector(`#${key}`);

        const span = document.createElement("span");
        const textNode = document.createTextNode(value);

        span.appendChild(textNode);
        span.style.color = "red";
        span.classList.add("error-message");

        element.parentElement.insertBefore(span, null);
    }
}

const removeMessage = () => {
    const elements = document.querySelectorAll(".error-message");
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
}

const countCharacters = (element, cb) => {
    element.addEventListener("input", (e) => {
        cb(element.value.length);
    })
}



/* const countChars = (element, maxLength, cb) => {
    let chars;

    element.addEventListener("beforeinput", (e) => {
        const selection = window.getSelection().toString();

        if ((element.value.length - selection.length) < maxLength) {
            cb(element.value.length - selection.length);
            return;
        }

        if (e.inputType != "deleteContentBackward" && e.inputType != "deleteContentForward") {
            e.preventDefault();
        }
    })

    element.addEventListener("paste", (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData("text");
        const selection = window.getSelection().toString();

        if ((element.value.length + paste.length - selection.length) > maxLength) {
            e.preventDefault();
        }
    })

    return chars;
} */