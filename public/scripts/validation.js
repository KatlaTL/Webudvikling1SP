const insertMessage = (data, selector = "form") => {
    removeMessage();

    const createElement = (element, value) => {
        const span = document.createElement("span");
        const textNode = document.createTextNode(value);

        span.appendChild(textNode);
        span.style.color = "red";
        span.classList.add("error-message");

        element.parentElement.insertBefore(span, null);
    }

    switch (data.status) {
        case 400:
            throw (`${data.status}: ${data.message}`);
        case 401:
            const element = document.querySelector(selector);
            createElement(element, data.userFriendlyMessage || data.message);
            return;
    }

    for (const [key, value] of Object.entries(data)) {
        const element = document.querySelector(`#${key}`);
        if (!element) {
            continue;
        }
        createElement(element, value);
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

const addRequired = (selector) => {
    const allRequired = document.querySelectorAll(`${selector} *[required]`);
    for (i in allRequired) {
        allRequired[i].classList?.add("required")
    }
}