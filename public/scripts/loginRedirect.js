//Function to create a redirect URL to our backend controller and attach all current query params to it
const redirectUrl = () => {
    const redirectURL = new URL("/internal/login/sso/redirect", document.baseURI);
    const pathName = window.location.pathname.split("/").slice(1).join("/");

    redirectURL.searchParams.append("page", pathName); //set the pathname as a query param

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    urlParams.forEach((value, key) => {
        redirectURL.searchParams.append(key, value); //attach all existing query params to the new URL
    })
    return redirectURL;
}

//Function to disable all elements with the class .disable-if-logged-out
const disabledCTAs = () => {
    const user = localStorage.getItem("user");

    if (!user) {        
        const CTAs = document.querySelectorAll(".disable-if-logged-out");
        
        for (i in CTAs) {
            CTAs[i].disabled = true;
        }
        
    }
}