const redirectUrl = () => {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    const redirectURL = new URL("/login/sso/redirect", document.baseURI);
    const page = urlParams.get("page");
    if (page) {
        redirectURL.searchParams.append("page", page);
    }
    return redirectURL;
}