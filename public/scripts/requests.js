//Populate the list of feature requests
const fillRequests = (requests, infinite = false) => {
    if (!requests) {
        return;
    }

    const requestsDiv = document.querySelector(".scroll-box-feature");
    let requestHtml = "";

    for (let i = 0; i < requests.length; i++) {
        const parseDate = Date.parse(requests[i].createdAt);
        const date = new Date(parseDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" });

        requestHtml += `
            <div class="feature-request" data-requestid=${requests[i].id}>
                <div class="request-click">
                    <h5 class="commenttitle">${requests[i].title}</h5>
                </div>
                <div class="status request-click">
                    <h7>${requests[i].status}</h7>
                </div>
                <div class="row">
                    <div class="col-md 10 request-click">
                        <p class="commenttekst">${requests[i].description}</p>
                        <div class="row">
                            <div class="col-md-3">
                                <p class="commenttekst">${date}</p>
                            </div>
                            <div class="col-md-3"> <button class="comment" type="button">
                                    <span><i><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                height="20" fill="currentColor" class="bi bi-chat"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                            </svg></i></span>
                                    <span class="btn-inner-text">${requests[i].commentCount}</span>
                                </button></div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="upvote-cta btn mr-2 mb-2 btn-pill btn-icon btn-outline-primary">
                            <span><i>↑</i></span>
                            <p class="upvote-p">${requests[i].upvotes}</p>
                        </button>
                    </div>
                </div>
            </div>`
    }

    if (infinite) {
        requestsDiv.innerHTML += requestHtml;
    } else {
        requestsDiv.innerHTML = requestHtml;
    }
}

//Populate the road map with feature requests
const fillRoadMap = (requests, statusSelector) => {
    if (!requests) {
        return;
    }

    const statusDiv = document.querySelector(statusSelector);
    const requestDiv = statusDiv.querySelector(".scroll-box")
    let requestHTML = "";

    for (let i = 0; i < requests.length; i++) {
        requestHTML += `
            <div class="row feature-request" data-requestid=${requests[i].id}>
                <div class="col-md-9">
                    <h6 class="commenttitle">${requests[i].title}</h6>
                    <p class="commenttekst">${requests[i].description}</p>
                </div>

                <div class="col-md-3">
                    <button class="smallupvote">
                        <span><i>↑</i></span>
                        <p class="upvote-p">${requests[i].upvotes}</p>
                    </button>
                </div>
            </div>
        `
    }
    requestDiv.innerHTML = requestHTML;
}

//Enable on click event listener for feature requests
const enableRequestClick = (selector) => {
    const featureRequest = document.querySelectorAll(selector);
    featureRequest.forEach((x) => {
        x.addEventListener('click', (e) => {
            e.preventDefault();
            const request = x.closest(".feature-request");
            const requestId = request.dataset.requestid;

            if (requestId) {
                window.location.assign(`/feature-requests/${requestId}/comments`);
            }
        })
    });
}

//Enable upvote functionality for all feature requests
const enableUpvoteCTA = (selector) => {
    const upvoteCTA = document.querySelectorAll(selector);
    upvoteCTA.forEach((cta) => {
        cta.addEventListener("click", (e) => {
            e.preventDefault();
            const request = cta.closest(".feature-request");
            const requestId = request.dataset.requestid;
            const user = localStorage.getItem("user");

            if (!user) {
                window.location.href = redirectUrl();
            }

            if (requestId) {
                fetchWrapper.put(`/internal/feature-requests/${requestId}/upvotes`, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(user).authorization}`
                    }
                })
                    .then(data => document.querySelectorAll(`.feature-request-upvotes [data-requestid="${requestId}"] .upvote-p`).forEach((value) => value.innerHTML = data.amount))
                    .catch(err => window.location.href = redirectUrl());
            }
        })
    });
}

//Function to check if there are more requests to fetch
const hasMoreRequest = (amount, total) => {
    return amount < total;
}
