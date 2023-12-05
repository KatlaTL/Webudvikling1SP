const redirectUrl = () => {
    const redirectURL = new URL("/login/sso/redirect", document.baseURI);
    const pathName = window.location.pathname.split("/").slice(1).join("/");
    
    redirectURL.searchParams.append("page", pathName); //set the pathname as a query param
    
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);

    urlParams.forEach((value, key) => {
        redirectURL.searchParams.append(key, value); //attach all existing query params to the new URL
    })
    return redirectURL;
}