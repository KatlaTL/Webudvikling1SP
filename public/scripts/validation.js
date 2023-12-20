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

const countChars = (element) => {
    element.addEventListener("input", (e) => {
        console.log(element.value)
        console.log(element.value.length);
        if (element.value.length >= 500) {
            console.log("here")
            e.preventDefault();
        }
    })

    element.addEventListener("paste", (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData("text");
        if ((element.value.length + paste.length) > 500) {
            e.preventDefault();
        }
    })
}